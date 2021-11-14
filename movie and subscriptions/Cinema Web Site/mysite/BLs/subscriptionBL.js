const userModelBL = require("../models/userModelBL");
const userFileDal = require("../DALs/usersFileDal");
const permissionsFileDal = require("../DALs/permissionsFileDal");
const writeToUserFileDal = require("../DALs/writeToUserFileDal");
const writeToPermissionsDal = require("../DALs/writeToPermissionsFileDal");
const wsMoviesDal = require("../DALs/wsMoviesDal");
const wsSubscriptionsDal = require("../DALs/wsSubscriptionsDal");
const wsMembers = require("../DALs/wsMembersDal");

const mongoose = require("mongoose");

async function getAllMembersSub() {
  try {
    let tmp = [];

    let members = await wsMembers.getMembersFromWs();

    for (let i = 0; i < members.length; i++) {
      members[i].subscription = await wsSubscriptionsDal.getSubWithMemberId(
        members[i]._id
      );
      tmp[i] = members[i].subscription;

      members[i].unSeenMovies = await wsMoviesDal.getMoviesFromWs();

      for (let k = 0; k < members[i].subscription.length; k++) {
        for (let j = 0; j < members[i].subscription[k].movies.length; j++) {
          let movId = members[i].subscription[k].movies[j].movieid;
          members[i].subscription[k].movies[j].moviename =
            await wsMoviesDal.getMovieById(movId);
        }
      }
    }

    for (let n = 0; n < members.length; n++) {
      for (let m = 0; m < members[n].subscription.length; m++) {
        if (members[n].subscription[m].movies !== undefined) {
          members[n].subscription = members[n].subscription[m].movies;
        }
      }
    }

    let finalArr = members.map((mem) => ({
      id: mem._id,
      name: mem.name,
      email: mem.email,
      city: mem.city,

      subscription: mem.subscription.map((mov) => ({
        movieid: mov.movieid,
        date: new Date(mov.date).toLocaleDateString("he-IL"),
        moviename: mov.moviename.name,
      })),

      unSeenMov: mem.unSeenMovies.filter(function (array_el) {
        return (
          mem.subscription.filter(function (anotherOne_el) {
            return anotherOne_el.movieid == array_el._id;
          }).length == 0
        );
      }),
    }));

    return finalArr;
  } catch (err) {
    console.log(err);
  }
}

async function subscribeToMemberNewMovie(memID, obj) {
  try {
    let subMember = await wsSubscriptionsDal.getSubWithMemberId(memID);
    //console.log(typeof memID )

    if (subMember.length == 0) {
      let newObj = {
        memberid: mongoose.Types.ObjectId(memID),
        movies: [
          {
            movieid: obj.movieid,
            date: obj.date,
          },
        ],
      };

      let resp = await wsSubscriptionsDal.addSubscribe(newObj);

      let ans = await getAllMembersSub();
      return ans;
    }

    if (subMember.length > 0) {
      let newObj = {
        movieid: obj.movieid,
        date: obj.date,
      };

      subMember[0].movies.push(newObj);
     // console.log(subMember);

      let subID = subMember[0]._id;

      let finalUpdSub = {
        memberid: mongoose.Types.ObjectId(memID),
        movies: subMember[0].movies,
      };

      let resp = await wsSubscriptionsDal.updateSuscription(subID, finalUpdSub);

      let ans = await getAllMembersSub();
      return ans;
    }
  } catch (err) {
    console.log(err);
  }
}

async function getMemberDetails(idval) {
  try {
    let member = await wsMembers.getMemberFromWs(idval);
    return member;
  } catch (err) {
    console.log(err);
  }
}

async function updateMemberInDB(idval, obj) {
  try {
    let upd = false;
    console.log(obj);
    console.log(typeof idval);

    let existMember = await wsMembers.getMemberFromWs(idval);

    if (existMember.name !== obj.memname) {
      upd = true;
    }
    if (existMember.email !== obj.mememail) {
      upd = true;
    }
    if (existMember.city !== obj.memcity) {
      upd = true;
    }

    if (upd) {
      let resp = await wsMembers.updateMember(idval, obj);
      return resp;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
}

async function deleteMember(idval) {
  try {
    //get member from subscription by member id

    let member = await wsSubscriptionsDal.getSubWithMemberId(idval);
    //console.log(member)

    if (member.length == 0) {
      let delMember = await wsMembers.deleteMember(idval);
      return delMember;
    }

    if (member.length > 0) {
      let delSubscription = await wsSubscriptionsDal.deleteSuscription(
        member[0]._id
      );

      let delMember = await wsMembers.deleteMember(idval);

      return delSubscription;
    }
  } catch (err) {
    console.log(err);
  }
}

async function addMemberToDB(obj) {
  try {
    let resp = await wsMembers.addMember(obj);
    return resp;
  } catch (err) {
    console.log(err);
  }
}

async function getMemberDetail(idval) {
  try {
    let resp = await wsMembers.getMemberFromWs(idval);
    return resp;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getAllMembersSub,
  subscribeToMemberNewMovie,
  getMemberDetails,
  updateMemberInDB,
  deleteMember,
  addMemberToDB,
  getMemberDetail,
};
