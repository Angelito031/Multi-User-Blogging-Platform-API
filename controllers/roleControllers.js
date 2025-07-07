import client from "../db/db.js";

export const GetAllRoles = async (req, res) => {
  try {
    const query = "SELECT * FROM roles";
    const { rows } = await client.query(query);

    if (rows.length === 0) {
      return res.status(404).json({ message: "There is no role available" });
    }

    return res
      .status(200)
      .json({ roles: rows, message: "Fetched all roles successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
