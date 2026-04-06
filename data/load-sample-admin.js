require("dotenv").config({ path: __dirname + "/../.variables.env" });
const fs = require("fs");
const { resolveDatabaseConfig } = require("../config/database");

const mongoose = require("mongoose");
const { mongoUri } = resolveDatabaseConfig();
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises

const Admin = require("../models/Admin");

const admins = JSON.parse(fs.readFileSync(__dirname + "/admins.json", "utf-8"));

async function loadData() {
  try {
    await Admin.insertMany(admins);
    console.log("👍 Done!");
    process.exit();
  } catch (e) {
    console.log(
      "\n🚫 Error →! The Error info is below but if you are importing sample data make sure to drop the existing database first with.\n"
    );
    console.log(e);
    process.exit();
  }
}

loadData();
