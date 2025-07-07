import client from "../db/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const Authenticate = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username) {
      return res.status(200).json({ message: "Username is required." });
    }

    if (!password) {
      return res.status(200).json({ message: "Password is required." });
    }

    const query =
      "SELECT users.uid, users.username, users.password, users.role_id FROM users WHERE users.username = $1";
    const { rows } = await client.query(query, [username]);

    if (rows.length === 0) {
      return res.status(200).json({ message: "Invalid username." });
    }

    const isPasswordValid = bcrypt.compareSync(password, rows[0].password);

    if (!isPasswordValid) {
      return res.status(200).json({ message: "Wrong password." });
    }

    //Creating access token
    const accessToken = jwt.sign(
      {
        uid: rows[0].uid,
        role_id: rows[0].role_id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    //Creating refresh token
    const refreshToken = jwt.sign(
      {
        uid: rows[0].uid,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    //Create a cookie
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: false, //Change to true for production
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ accessToken, message: "Login Succesfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const RefreshUserToken = async (req, res) => {
  try {
    const refreshToken = req.cookies?.jwt;

    if (!refreshToken) {
      return res.status(200).json({ message: "No session to clear" });
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          console.log(err);
          return res.status(200).json({ message: "Unauthorized" });
        }

        //Creating access token
        const accessToken = jwt.sign(
          {
            uid: decoded.uid,
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15m" }
        );
        return res
          .status(200)
          .json({ accessToken, message: "Token has been refresh Succesfully" });
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies?.jwt;

    if (!refreshToken) {
      return res.status(200).json({ message: "No session to clear" });
    }

    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      secure: false, //Change to true for production
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
