import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();
import { UserModel } from "../models/Users.js";

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });
  if (user) {
    return res.status(400).json({ message: "Username already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({ username, password: hashedPassword });
  await newUser.save();
  res.json({ message: "User registered successfully" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username });

  if (!user) {
    return res
      .status(400)
      .json({ message: "Username or password is incorrect" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res
      .status(400)
      .json({ message: "Username or password is incorrect" });
  }
  const token = jwt.sign({ id: user._id }, "secret");
  res.json({ token, userID: user._id });
});

export { router as userRouter };

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, "secret", (err) => {
      if (err) {
        return res.sendStatus(403);
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// import express from "express";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
// import { OAuth2Client } from "google-auth-library";

// const router = express.Router();
// import { UserModel } from "../models/Users.js";

// const client = new OAuth2Client(CLIENT_ID); // Replace CLIENT_ID with your actual client ID obtained from the Google Developers Console

// router.post("/register", async (req, res) => {
//   const { username, password, idToken } = req.body;

//   if (idToken) {
//     try {
//       const ticket = await client.verifyIdToken({
//         idToken,
//         audience: CLIENT_ID,
//       });
//       const { name, email } = ticket.getPayload();

//       let user = await UserModel.findOne({ email });
//       if (user) {
//         return res.status(400).json({ message: "User already exists" });
//       }

//       const hashedPassword = await bcrypt.hash(password, 10);
//       user = new UserModel({ username: name, password: hashedPassword, email });
//       await user.save();

//       const token = jwt.sign({ id: user._id }, "secret");
//       res.json({ token, userID: user._id });
//     } catch (error) {
//       console.error("Error verifying Google ID token:", error);
//       return res.status(400).json({ message: "Failed to authenticate with Google" });
//     }
//   } else {
//     return res.status(400).json({ message: "Invalid request" });
//   }
// });

// router.post("/login", async (req, res) => {
//   const { username, password, idToken } = req.body;

//   if (idToken) {
//     try {
//       const ticket = await client.verifyIdToken({
//         idToken,
//         audience: CLIENT_ID,
//       });
//       const { email } = ticket.getPayload();

//       const user = await UserModel.findOne({ email });

//       if (!user) {
//         return res.status(400).json({ message: "User not found" });
//       }

//       const token = jwt.sign({ id: user._id }, "secret");
//       res.json({ token, userID: user._id });
//     } catch (error) {
//       console.error("Error verifying Google ID token:", error);
//       return res.status(400).json({ message: "Failed to authenticate with Google" });
//     }
//   } else {
//     const user = await UserModel.findOne({ username });

//     if (!user) {
//       return res.status(400).json({ message: "Username or password is incorrect" });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(400).json({ message: "Username or password is incorrect" });
//     }

//     const token = jwt.sign({ id: user._id }, "secret");
//     res.json({ token, userID: user._id });
//   }
// });

// export { router as userRouter };

// export const verifyToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (authHeader) {
//     jwt.verify(authHeader, "secret", (err) => {
//       if (err) {
//         return res.sendStatus(403);
//       }
//       next();
//     });
//   } else {
//     res.sendStatus(401);
//   }
// };
