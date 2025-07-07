import client from "../db/db.js";

export const GetAllRoles = async (req, res) => {
  try {
    const query = "SELECT * FROM roles";
    const { rows } = await client.query(query);

    if (rows.length === 0) {
      return res.status(200).json({ message: "There is no role available" });
    }

    return res.status(200).json({ roles: rows, message: "Got all role." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const GetRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM roles WHERE id = $1";
    const { rows } = await client.query(query, [id]);

    if (rows.length === 0) {
      return res
        .status(200)
        .json({ message: `There is no role by the id: ${id}` });
    }

    return res.status(200).json({ role: rows[0], message: "Got one role." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const CreateRole = async (req, res) => {
  try {
    const { role, description } = req.body;

    const query = `INSERT INTO roles (role, description) VALUES ( $1,$2 );`;

    if (!role && !description) {
      return res.status(200).json({ message: "All input fields is required." });
    }

    if (!role) {
      return res.status(206).json({ message: "Role name is required." });
    }

    if (!description) {
      return res.status(206).json({ message: "Description is required." });
    }

    const name = role.toLowerCase();

    await client.query(query, [name, description]);

    return res.status(201).json({ message: "New Role has been created." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const UpdateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, description } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Invalid Role ID" });
    }

    if (!role) {
      return res.status(400).json({ message: "Role name is required." });
    }

    if (!description) {
      return res.status(400).json({ message: "Role descript is required." });
    }

    const findRoleQuery = "SELECT * FROM roles WHERE id = $1";
    const { rows } = await client.query(findRoleQuery, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: `No role found with id: ${id}` });
    }

    const updateRoleQuery =
      "UPDATE roles SET role = $1, description = $2 WHERE id = $3";
    const result = await client.query(updateRoleQuery, [role, description, id]);

    if (result.rowCount === 0) {
      return res.status(400).json({ message: "Role update failed" });
    }

    return res.status(200).json({ message: "Role updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const DeleteRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const findRoleQuery = "SELECT * FROM roles WHERE id = $1";
    const { rows } = await client.query(findRoleQuery, [id]);

    if (rows.length === 0) {
      return res
        .status(200)
        .json({ message: `There is no role by the id: ${id}` });
    }
    const deleteRoleQuery = "DELETE FROM roles WHERE id = $1";
    await client.query(deleteRoleQuery, [id]);

    return res.status(200).json({ message: "Deleted one role." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const DeleteAllRoles = async (req, res) => {
  try {
    const query = "DELETE FROM roles";
    await client.query(query);

    return res.status(200).json({ message: "Deleted all role." });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};
