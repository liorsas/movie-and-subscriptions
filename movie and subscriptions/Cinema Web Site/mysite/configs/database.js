const mongoose = require("mongoose");
const dbUri =

    "mongodb://localhost:27017/usersDB"
    
      
    mongoose.connect(dbUri).then( x => console.log("succesful connected" + " " + dbUri)).catch((error) => {
        console.log("database connection failed. exiting now...");
        console.error(error);
        process.exit(1);
      });
  