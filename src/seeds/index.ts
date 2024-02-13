// import db from '../config/index';
// import { User } from '../models';
// // import { Package } from '../models/Package';
// import {users} from './seed';
// const bcrypt = require("bcrypt")

// const seedData = async () => {
//   try {
//     await db.authenticate();
//     console.log('Connection to database has been established successfully.');
//     await db.sync({ force: true });
//     // await User.bulkCreate(users);
//     // await Package.bulkCreate(packages);
//     for (const user of users) {
//       const isAdmin = user.isAdmin || false;
//       let hashedPassword = null;
//       let salt = null
//       if (user.password) {
//         const saltRounds = 10;
//         salt = await bcrypt.genSalt(saltRounds);
//         hashedPassword = await bcrypt.hash(user.password, salt);
//       }
//       await User.create({
//         name: user.name,
//         surname: user.surname,
//         email: user.email,
//         password: hashedPassword,
//         isAdmin: isAdmin,
//         resetPasswordToken: null,
//       });
//     }

//     console.log('Data seeding successful');
//   } catch (error) {
//     console.error('Error seeding data:', error);
//   } finally {
//     await db.close();
//     console.log('Database connection closed.');
//   }
// };
// seedData();

import db from "../config/index";
import { Package, User } from "../models";
import { users, packages } from "./seed";

const seedData = async () => {
  try {
    await db.authenticate();
    console.log("Connection to database has been established successfully.");
    await db.sync({ force: true });

    for (const user of users) {
      await User.create(user);
    }
    for (const pkg of packages) {
      await Package.create(pkg);
    }

    console.log("Data seeding successful");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await db.close();
    console.log("Database connection closed.");
  }
};

seedData();
