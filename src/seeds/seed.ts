//npm run seed


export const users = [
  {
    name: "Luis",
    surname: "Robledo",
    email: "luisrobledo@gmail.com",
    password: "Luis1234",
  },
  {
    name: "Hernan",
    surname: "Duarte",
    email: "hernanduarte@gmail.com",
    password: "Hernan1234",
  },
  {
    name: "Dario",
    surname: "Andrada",
    email: "darioandrada@gmail.com",
    password: "Dario1234",
  },
  {
    name: "Valentin",
    surname: "Guardia",
    email: "valentinguardia@gmail.com",
    password: "Valentin1234",
  },
  {
    name: "Matias",
    surname: "Ramos",
    email: "matiasramos@gmail.com",
    password: "Matias1234",
  },

  {
    name: "Admin",
    surname: "Unico",
    email: "admin@gmail.com",
    password: "Admin1234",
    isAdmin: true,
  }
];

// export const packages = [
//   {
//     adress: "Belgrano 696",
//     receptorName: "Rodrigo",
//     weight: 5,
//     deadline: new Date("2023-07"),
//     city: "Salta",
//   },
//   {
//     adress: "Rojas 601",
//     receptorName: "Ema",
//     weight: 5,
//     deadline: new Date("2023-07"),
//     city: "Buenos Aires",
//   },
//   {
//     adress: "Osaka 1249",
//     receptorName: "Santi",
//     weight: 5,
//     deadline: new Date("2023-07"),
//     city: "Buenos Aires",
//   },
//   {
//     adress: "Galicia 1436",
//     receptorName: "Rafa",
//     weight: 5,
//     deadline: new Date("2023-07"),
//     city: "Buenos Aires",
//   },
// ];

///////////////////
// const bcrypt = require("bcrypt");
// const faker = require("faker");
// const db = require("../config");
// const { User } = require("../models");

// const generateUsers = (count: number) => {
//   const users = [];
//   for (let i = 0; i < count; i++) {
//     const name = faker.name.firstName();
//     const surname = faker.name.lastName();
//     const email = faker.internet.email();
//     const password = faker.internet.password();
//     const hashedPassword = bcrypt.hashSync(password, 10);
//     const isAdmin = false;
//     users.push({ name, surname, email, password: hashedPassword, isAdmin });
//   }
//   return users;
// };

// const adminUser = {
//   name: faker.name.firstName(),
//   surname: faker.name.lastName(),
//   email: faker.internet.email(),
//   password: bcrypt.hashSync(faker.internet.password(), 10),
//   isAdmin: true,
// };

// (async () => {
//   try {
//     await db.authenticate();
//     console.log('Connection to database has been established successfully.');

//     const users = generateUsers(8);
//     users.push(adminUser);

//     await db.sync({ force: true });

//     await db.models.User.bulkCreate(users);

//     console.log('Data seeding successful');
//   } catch (error) {
//     console.error('Error seeding data:', error);
//   } finally {
//     await db.close();
//     console.log('Database connection closed.');
//   }
// })();

///////////////////////////////////

// import { config } from "dotenv";
// config();
// import db from "../config";
// const bcrypt = require("bcrypt");
// import { User } from "../models";
// const faker = require("faker")


// const saltRounds = 10;

// const seedDatabase = async () => {
//   await db.sync({ force: true });

//   let userDNIs = [];
//   for (let i = 0; i < 50; i++) {
//     const dni = faker.datatype.number({ min: 10000000, max: 99999999 });
//     const hashedPassword = await bcrypt.hash("password", saltRounds);

//     const user = await User.create({
//       dni,
//       fullName: faker.name.fullName(),
//       email: faker.internet.email(),
//       phoneNumber: faker.datatype.number({ min: 100000000, max: 999999999 }),
//       role: faker.helpers.arrayElement(["super", "admin", "oper", "user"]),
//       password: hashedPassword,
//     });
//     userDNIs.push(dni);
//   }

//   const specificUsers = [
//     {
//       dni: 11111111,
//       fullName: "Super User",
//       email: "s@s.com",
//       password: "super",
//       role: "super",
//     },
//     {
//       dni: 22222222,
//       fullName: "Admin User",
//       email: "a@a.com",
//       password: "admin",
//       role: "admin",
//     },
//     {
//       dni: 33333333,
//       fullName: "Operational User",
//       email: "o@o.com",
//       password: "oper",
//       role: "oper",
//     },
//     {
//       dni: 44444444,
//       fullName: "Regular User",
//       email: "u@u.com",
//       password: "user",
//       role: "user",
//     },
//   ];

//   for (const user of specificUsers) {
//     const hashedPassword = await bcrypt.hash(user.password, saltRounds);
//     await User.create({
//       dni: user.dni,
//       fullName: user.fullName,
//       email: user.email,
//       phoneNumber: faker.datatype.number({ min: 100000000, max: 999999999 }),
//       role: user.role,
//       password: hashedPassword,
//     });
//   }
//   console.log(
//     "¡Datos de prueba generados con éxito! Esperá a que finalice, no canceles el proceso..."
//   );
// };

// seedDatabase().catch(console.error);


