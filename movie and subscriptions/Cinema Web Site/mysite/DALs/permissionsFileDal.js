const jFile = require("jsonfile");

function getPermissionsDal() {
  return new Promise((resolve, reject) => {
    jFile.readFile(__dirname + "/permissions.json", function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

module.exports = { getPermissionsDal };
