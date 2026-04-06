require("dotenv").config({ path: __dirname + "/../.variables.env" });
const { resolveDatabaseConfig } = require("../config/database");

const mongoose = require("mongoose");
const { mongoUri } = resolveDatabaseConfig();
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises

// import all of our models - they need to be imported only once

// const patients = JSON.parse(
//   fs.readFileSync(__dirname + "/patients.json", "utf-8")
// );

// async function deleteData() {
//   console.log("😢😢 Goodbye Data...");
//   await Patient.remove();
//   console.log(
//     "Data Deleted. To load sample data, run\n\n\t npm run sample\n\n"
//   );
//   process.exit();
// }

// async function loadData() {
//   try {
//     await Item.insertMany(patients);
//     console.log("👍👍👍👍👍👍👍👍 Done!");
//     process.exit();
//   } catch (e) {
//     console.log(
//       "\n👎👎👎👎👎👎👎👎 Error! The Error info is below but if you are importing sample data make sure to drop the existing database first with.\n\n\t npm run blowitallaway\n\n\n"
//     );
//     console.log(e);
//     process.exit();
//   }
// }

async function createAdmin() {
  try {
    const Admin = require("../models/Admin");
    const adminEmail = process.env.DEMO_ADMIN_EMAIL || "admin@demo.com";
    const adminName = process.env.DEMO_ADMIN_NAME || "admin";
    const adminSurname = process.env.DEMO_ADMIN_SURNAME || "demo";
    const adminPassword = process.env.DEMO_ADMIN_PASSWORD || "123456";

    const existingAdmin = await Admin.findOne({ email: adminEmail }).select("_id");
    if (existingAdmin) {
      console.log(
        `👍 Admin already exists: ${adminEmail} (credentials are kept unchanged)`
      );
      process.exit();
      return;
    }

    var newAdmin = new Admin();
    const passwordHash = newAdmin.generateHash(adminPassword);

    await new Admin({
      email: adminEmail,
      password: passwordHash,
      name: adminName,
      surname: adminSurname,
    }).save();
    console.log(`👍 Admin created: ${adminEmail}`);
    process.exit();
  } catch (e) {
    console.log("\n👎👎👎👎👎👎👎👎 Error! The Error info is below");
    console.log(e);
    process.exit();
  }
}
createAdmin();
// if (process.argv.includes("--delete")) {
//   deleteData();
// } else {
//   loadData();
// }
