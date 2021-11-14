const jFile = require("jsonfile");

function getUsersDal() {
  return new Promise((resolve, reject) => {
    jFile.readFile(__dirname + "/users.json", function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

module.exports = { getUsersDal };
