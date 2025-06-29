import client from "../db/db.js";

export const GetAllUsers = async (req, res) => {
  try {
    const query = "SELECT * FROM users";
    const result = await client.query(query);

    console.log(result);

    return res.json({ message: "Hello" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};

export const GetUserById = async (req, res) => {
  try {
    return res.json({ message: "Hello by id" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};

export const CreateUser = async (req, res) => {
  try {
    return res.json({ message: "Hello by create user" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};

export const UpdateUser = async (req, res) => {
  try {
    return res.json({ message: "Hello by update" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};

export const DeleteUserById = async (req, res) => {
  try {
    return res.json({ message: "Hello by delete id" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};

export const DeleteAllUsers = async (req, res) => {
  try {
    return res.json({ message: "Hello by delete all" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};
