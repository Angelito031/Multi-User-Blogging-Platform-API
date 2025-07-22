import client from "../db/db.js";

export const GetAllComments = async (req, res) => {
  try {
    const { last_cid = Number.MAX_SAFE_INTEGER, limit = 10 } = req.params;

    const query = `
      SELECT 
        c.cid, 
        c.comment, 
        c.created_at, 
        (u.firstname || ' ' || u.lastname) AS author_name,
        c.blog_id,
        b.title AS blog_title
      FROM comments c
      JOIN users u ON c.author_id = u.uid
      JOIN blogs b ON c.blog_id = b.bid
      WHERE c.cid < $1
      ORDER BY c.cid DESC
      LIMIT $2;
    `;

    const result = await client.query(query, [last_cid, limit]);

    if (result.rows.length === 0) {
      return res
        .status(200)
        .json({ message: "No comments found in the database." });
    }

    return res
      .status(200)
      .json({ comments: result.rows, message: "Get All Comments" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const CreateComment = async (req, res) => {
  try {
    const { comment, blog_id } = req.body;
    const authorId = req.user?.uid;

    if (!authorId) {
      return res.status(400).json({ message: "Invalid user ID." });
    }

    if (!comment || !blog_id) {
      return res
        .status(400)
        .json({ message: "Comment content and blog ID are required." });
    }

    const query = `
      INSERT INTO comments (comment, author_id, blog_id) 
      VALUES ($1, $2, $3)
      RETURNING cid, comment, created_at
    `;
    const result = await client.query(query, [comment, authorId, blog_id]);

    return res.status(201).json({
      message: "Comment created successfully.",
      comment: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const UpdateComment = async (req, res) => {
  try {
    const { cid } = req.params;
    const { comment } = req.body;
    const authorId = req.user?.uid;

    if (!comment || !cid) {
      return res
        .status(400)
        .json({ message: "Missing comment content or ID." });
    }

    // Optional: Check ownership before update
    const checkQuery = "SELECT author_id FROM comments WHERE cid = $1";
    const checkResult = await client.query(checkQuery, [cid]);

    if (checkResult.rows.length === 0) {
      return res.status(404).json({ message: "Comment not found." });
    }

    if (checkResult.rows[0].author_id !== authorId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this comment." });
    }

    const updateQuery = `
      UPDATE comments 
      SET comment = $1, updated_at = CURRENT_TIMESTAMP 
      WHERE cid = $2
    `;
    await client.query(updateQuery, [comment, cid]);

    return res.status(200).json({ message: "Comment updated successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const DeleteCommentById = async (req, res) => {
  try {
    const { cid } = req.params;
    const authorId = req.user?.uid;
    const isAdmin = req.user?.role_id === 1;

    if (!cid) {
      return res.status(400).json({ message: "Comment ID is required." });
    }

    const checkQuery = "SELECT author_id FROM comments WHERE cid = $1";
    const checkResult = await client.query(checkQuery, [cid]);

    if (checkResult.rows.length === 0) {
      return res.status(404).json({ message: "Comment not found." });
    }

    const commentAuthor = checkResult.rows[0].author_id;

    if (!isAdmin && commentAuthor !== authorId) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this comment." });
    }

    const deleteQuery = "DELETE FROM comments WHERE cid = $1";
    await client.query(deleteQuery, [cid]);

    return res.status(200).json({ message: "Comment deleted successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const DeleteAllComments = async (req, res) => {
  try {
    const { confirm } = req.body;
    const isAdmin = req.user?.role_id === 1;

    if (!isAdmin) {
      return res
        .status(403)
        .json({ message: "Only admins can delete all comments." });
    }

    if (!confirm) {
      return res
        .status(400)
        .json({ message: "Confirmation required to proceed." });
    }

    await client.query("DELETE FROM comments");
    return res
      .status(200)
      .json({ message: "All comments deleted successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
