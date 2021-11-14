const jFile = require("jsonfile");

function writeToPermissionsFile(obj) {
  return new Promise((resolve, reject) => {
    jFile.writeFile(__dirname + "/permissions.json", obj, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve("succeded");
      }
    });
  });
}

module.exports = { writeToPermissionsFile };
