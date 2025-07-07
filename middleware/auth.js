import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import client from "../db/db.js";

dotenv.config();

export const isAuthenticated = (req, res, next) => {
  const hasAccessToken = req.headers.authorization;

  if (!hasAccessToken || !hasAccessToken.startWith("Bearer ")) {
    return res.status(401).json({ message: "Not Authorized." });
  }

  const accessToken = hasAccessToken.split(" ", [1]);
  try {
    const result = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.user = result;
    next();
  } catch (error) {
    console.error(error);
    return res.status(403).json({ message: "Token expired or invalid" });
  }
};

export const isRoleAllowed = (allowedRoles) => {
  return async (req, res, next) => {
    const uid = req.user?.uid;

    const userRoleIdQuery =
      "SELECT users.role_id FROM users WHERE users.uid = $1";
    const { rows } = await client.query(userRoleIdQuery, [uid]);
    const userRoleId = rows[0].role_id;

    const allowedRoleQuery =
      "SELECT roles.id FROM roles WHERE roles.name = ANY($1)";
    const result = await client.query(allowedRoleQuery, allowedRoles);
    result.rows.map((roleId) => {
      if (userRoleId === roleId.id) {
        next();
      } else {
        return res.status(401).json({ message: "Not Authorized." });
      }
    });
  };
};
