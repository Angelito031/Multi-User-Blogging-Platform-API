import client from "../db/db.js";
import bcrypt from "bcrypt";

export const GetAllUsers = async (req, res) => {
  try {
    const query =
      "SELECT users.uid, users.firstname, users.lastname, users.username, roles.role AS role FROM users LEFT JOIN roles ON users.role_id = roles.id";
    const result = await client.query(query);

    console.log(result);

    if (result.rows.length === 0) {
      return res
        .status(200)
        .json({ message: "No users available in the database." });
    }

    return res
      .status(200)
      .json({ users: result.rows, message: "Get All Users" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const GetUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(200).json({ message: "Invalid User ID" });
    }

    const query =
      "SELECT users.uid, users.firstname, users.lastname, users.username, roles.role AS role FROM users LEFT JOIN roles ON users.role_id = roles.id WHERE users.uid = $1";
    const result = await client.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(200).json({ message: "User has not been found" });
    }

    return res.status(200).json({
      user: result.rows[0],
      message: "User data has been gathered",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const CreateUser = async (req, res) => {
  try {
    const { firstname, lastname, username, password, role_id } = req.body;
    const query =
      "INSERT INTO users (firstname, lastname, username, password, role_id) VALUES ($1, $2, $3, $4, $5)";

    const hashpassword = bcrypt.hashSync(password, 10);
    const result = await client.query(query, [
      firstname,
      lastname,
      username,
      hashpassword,
      role_id,
    ]);

    if (result.rowCount === 1) {
      return res.status(201).json({ message: `User has been created.` });
    } else {
      console.log("Insert query ran but affected 0 rows");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const UpdateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, username, role_id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Invalid User ID" });
    }

    if (!firstname) {
      return res
        .status(400)
        .json({ message: "Server: Firstname field is empty." });
    }
    if (!lastname) {
      return res
        .status(400)
        .json({ message: "Server: Lastname field is empty." });
    }
    if (!username) {
      return res
        .status(400)
        .json({ message: "Server: Username field is empty." });
    }
    if (!role_id) {
      return res.status(400).json({ message: "Server: Role field is empty." });
    }

    const findUserQuery =
      "SELECT users.firstname, users.lastname, users.username, users.role_id FROM users WHERE uid = $1";
    const findUserResult = await client.query(findUserQuery, [id]);

    if (findUserResult.rows.length === 0) {
      return res.status(200).json({ message: "User has not been found" });
    }

    const roleCheck = "SELECT * FROM roles WHERE roles.id = $1";
    const roleCheckResult = await client.query(roleCheck, [role_id]);

    if (roleCheckResult.rows.length === 0) {
      return res.status(400).json({ message: `Invalid role_id: ${role_id}` });
    }

    const updateUserQuery =
      "UPDATE users SET firstname = $1, lastname = $2, username = $3, role_id = $4 WHERE users.uid = $5";
    const updateResult = await client.query(updateUserQuery, [
      firstname,
      lastname,
      username,
      role_id,
      id,
    ]);

    if (updateResult.rowCount === 0) {
      return res.status(400).json({ message: "User update failed" });
    }
    return res.status(200).json({ message: "User data has been updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const DeleteUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(200).json({ message: "Invalid User ID" });
    }

    const findUserQuery =
      "SELECT users.firstname, users.lastname FROM users WHERE uid = $1";
    const findUserResult = await client.query(findUserQuery, [id]);

    if (findUserResult.rowCount === 1) {
      const deleteUserQuery = "DELETE FROM users WHERE uid = $1";
      await client.query(deleteUserQuery, [id]);

      return res.status(200).json({ message: "User has been removed" });
    } else {
      return res.status(200).json({ message: "User has not been found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const DeleteAllUsers = async (req, res) => {
  try {
    const query = "DELETE FROM users";
    await client.query(query);

    return res.status(200).json({ message: "Deleted all users." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
