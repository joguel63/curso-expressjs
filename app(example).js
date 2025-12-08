// require("dotenv").config();
// const express = require("express");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const { prisma } = require("./src/utils/prisma");

// const app = express();
// const port = process.env.PORT || 3000;

// const fs = require("fs");
// const path = require("path");
// const loggerMiddleware = require("./src/middlewares/logger");
// const errorHandler = require("./src/middlewares/errorHandler");
// const authenticateToken = require("./src/middlewares/auth");

// // Ruta al archivo JSON que actúa como base de datos simple
// const usersFilePath = path.join(__dirname, "users.json");

// // Middlewares: sirven para procesar las solicitudes antes de que lleguen a las rutas
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(loggerMiddleware);
// app.use(errorHandler);
// // --------------------------------------------

// // Rutas
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.get("/users/:id", (req, res) => {
//   const userId = req.params.id;
//   res.send(`User ID: ${userId}`);
// });

// app.get("/search", (req, res) => {
//   //puede tener varios query params
//   const terms = req.query.terms;
//   const category = req.query.category;
//   res.send(`Search terms: ${terms}, Category: ${category}`);
// });

// app.post("/form", (req, res) => {
//   const name = req.body.name;
//   const email = req.body.email;
//   res.json({ data: { name, email } });
// });

// app.post("/api/data", (req, res) => {
//   const data = req.body;
//   if (!data || Object.keys(data).length === 0) {
//     return res.status(400).json({ error: "No data provided" });
//   }
//   res.status(201).json({ message: "Data received", data });
// });

// app.get("/users", (req, res) => {
//   fs.readFile(usersFilePath, "utf8", (err, data) => {
//     if (err) {
//       return res.status(500).json({ error: "Error reading users file" });
//     }
//     const users = JSON.parse(data);
//     res.status(200).json(users);
//   });
// });

// const validateUser = (user) => {
//   const isValidName = typeof user.name === "string" && user.name.trim() !== "";
//   const isValidEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };
//   const isValidUserEmail = typeof user.email === "string" && isValidEmail(user.email);
//   return isValidName && isValidUserEmail;
// };

// const getNextId = (users) => {
//   if (users.length === 0) return 1;
//   const ids = users.map((user) => user.id);
//   return Math.max(...ids) + 1;
// };

// app.post("/users", (req, res) => {
//   const newUser = req.body;

//   if (!validateUser(newUser)) {
//     return res.status(400).json({ error: "Invalid user data" });
//   }

//   fs.readFile(usersFilePath, "utf8", (err, data) => {
//     if (err) {
//       return res.status(500).json({ error: "Error reading users file" });
//     }
//     const users = JSON.parse(data);
//     users.push({ id: getNextId(users), ...newUser });
//     fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
//       if (err) {
//         return res.status(500).json({ error: "Error writing users file" });
//       }
//       res.status(201).json({ message: "User added", user: newUser });
//     });
//   });
// });

// app.put("/users/:id", (req, res) => {
//   const userId = parseInt(req.params.id, 10);
//   const updatedUser = req.body;
//   if (!validateUser(updatedUser)) {
//     return res.status(400).json({ error: "Invalid user data" });
//   }

//   fs.readFile(usersFilePath, "utf8", (err, data) => {
//     if (err) {
//       return res.status(500).json({ error: "Error reading users file" });
//     }
//     let users = JSON.parse(data);
//     const userIndex = users.findIndex((user) => user.id === userId);
//     if (userIndex === -1) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     users[userIndex] = { id: userId, ...updatedUser };
//     fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
//       if (err) {
//         return res.status(500).json({ error: "Error writing users file" });
//       }
//       res.status(200).json({ message: "User updated", user: users[userIndex] });
//     });
//   });
// });

// app.delete("/users/:id", (req, res) => {
//   const userId = parseInt(req.params.id, 10);
//   fs.readFile(usersFilePath, "utf8", (err, data) => {
//     if (err) {
//       return res.status(500).json({ error: "Error reading users file" });
//     }
//     let users = JSON.parse(data);
//     const userIndex = users.findIndex((user) => user.id === userId);
//     if (userIndex === -1) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     users.splice(userIndex, 1);
//     fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
//       if (err) {
//         return res.status(500).json({ error: "Error writing users file" });
//       }
//       res.status(200).json({ message: "User deleted" });
//     });
//   });
// });

// app.get("/db-users", async (req, res, next) => {
//   try {
//     const users = await prisma.user.findMany();
//     res.status(200).json(users);
//   } catch (error) {
//     next(error);
//   }
// });

// app.get("/protected", authenticateToken, (req, res) => {
//   res.json({ message: "This is a protected route", user: req.user });
// });

// app.post("/register", async (req, res, next) => {
//   try {
//     const { name, email, password, role } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = await prisma.user.create({
//       data: { name, email, password: hashedPassword, role },
//     });
//     res.status(201).json({ message: "User registered", user: newUser });
//   } catch (error) {
//     next(error);
//   }
// });

// app.post("/login", async (req, res, next) => {
//   try {
//     const { email, password } = req.body;
//     const user = await prisma.user.findUnique({ where: { email } });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }
//     // Aquí generarías y devolverías un token JWT
//     const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });
//     res.status(200).json({ message: "Login successful", token });
//   } catch (error) {
//     next(error);
//   }
// });

// // Iniciar el servidor
// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });
