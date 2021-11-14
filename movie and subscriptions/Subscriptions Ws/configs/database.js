const mongoose = require("mongoose");
const dbUri =
  process.env.DEV_MODE === "true"
    ?"mongodb://localhost:27017/subscriptionsDB"
    : "mongodb+srv://liorsas:Nati0307&@cluster0.80kdp.mongodb.net/subscriptionsDB?authSource=admin&replicaSet=atlas-mncsto-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true"
      
    mongoose.connect(dbUri).then( x => console.log("succesful connected" + " " + dbUri)).catch((error) => {
        console.log("database connection failed. exiting now...");
        console.error(error);
        process.exit(1);
      });
  
