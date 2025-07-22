import client from "../db/db.js";

export const GetAllBlogs = async (req, res) => {
  try {
    const { last_bid = 0, limit = 10 } = req.params;

    const query =
      "SELECT blogs.bid, blogs.title, blogs.content, blogs.created_at, (users.firstname || ' ' || users.lastname) AS author_name FROM blogs LEFT JOIN users ON blogs.author_id = users.uid WHERE blogs.bid < $1 ORDER BY blogs.bid DESC LIMIT $2";

    const result = await client.query(query, [last_bid, limit]);

    if (result.rows.length === 0) {
      return res
        .status(200)
        .json({ message: "No blog posts available in the database." });
    }

    return res
      .status(200)
      .json({ blogs: result.rows, message: "Get All Blog Posts" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error has occured." });
  }
};

export const GetBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Invalid User ID" });
    }

    const query =
      "SELECT blogs.bid, blogs.title, blogs.content, blogs.created_at, (users.firstname || ' ' || users.lastname) FROM blogs LEFT JOIN users ON blogs.author_id = users.uid WHERE blogs.bid = $1";

    const result = await client.query(query, [id]);

    if (result.rows.length === 0) {
      return res
        .status(200)
        .json({ message: "Blog posts has not been found." });
    }

    return res
      .status(200)
      .json({ blog: result.rows, message: "Get Blog Post" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error has occured." });
  }
};

export const CreateBlogPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const authorId = req.user?.uid;
    const roleId = req.user?.role_id;

    if (!authorId) {
      return res.status(400).json({ message: "Invalid User ID" });
    }

    if (roleId !== 1 || roleId !== 2) {
      return res
        .status(403)
        .json({ message: "Sorry only ADMIN and EDITOR can post a blog." });
    }

    const query = "INSERT INTO (title, content, author_id) VALUES ($1, $2, $3)";

    const result = await client.query(query, [title, content, authorId]);

    if (result.rows.length === 0) {
      return res
        .status(200)
        .json({ message: "Blog posts has not been found." });
    }

    return res.status(200).json({ message: "Blog post created." });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error has occured." });
  }
};

export const UpdateBlogPost = async (req, res) => {
  try {
    const roleId = req.user?.role_id;
    const { blogId } = req.params;
    const { title, content } = req.body;

    if (roleId !== 1 || roleId !== 2) {
      return res
        .status(403)
        .json({ message: "Sorry only ADMIN and EDITOR can edit blog post." });
    }

    const checkBlogPostIfExistQuery =
      "SELECT blogs.title, blogs.content, blog.authord_id WHERE blogs.bid = $1";

    const { rows } = await client.query(checkBlogPostIfExistQuery, [blogId]);

    if (rows.length === 0) {
      return res.status(200).json({ message: "Blog Post not exist." });
    }

    const updateBlogPost =
      "UPDATE blogs SET title = $1, content = $2, author_id = $3 WHERE blogs.bid = $4";

    const updateResult = await client.query(updateBlogPost, [
      title,
      content,
      rows[0].author_id,
    ]);

    if (updateResult.rows.length === 0) {
      return res.status(200).json({
        message: "An error has occured while updating the blog post.",
      });
    }

    return res.status(200).json({ message: "Blog post updated successfully." });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error has occured." });
  }
};

export const DeleteBlogPost = async (req, res) => {
  try {
    const { confirm } = req.body;
    const { blogId } = req.params;
    const isAdmin = req.user?.role_id === 1; //ADMIN ROLE ID

    if (!isAdmin) {
      return res
        .status(403)
        .json({ message: "Only admins are allowed to delete all blogs.." });
    }

    if (!confirm) {
      return res
        .status(400)
        .json({ message: "Confirmation required to delete all blogs." });
    }

    const query = "DELETE FROM blogs WHERE blogs.bid = $1";
    await client.query(query, [blogId]);

    return res.status(200).json({ message: "Deleted a blog post." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const DeleteAllBlogs = async (req, res) => {
  try {
    const { confirm } = req.body;
    const isAdmin = req.user?.role_id === 1; //ADMIN ROLE ID

    if (!isAdmin) {
      return res
        .status(403)
        .json({ message: "Only admins are allowed to delete all blogs.." });
    }

    if (!confirm) {
      return res
        .status(400)
        .json({ message: "Confirmation required to delete all blogs." });
    }

    const query = "DELETE FROM blogs";
    await client.query(query);

    return res.status(200).json({ message: "Deleted all blogs." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
