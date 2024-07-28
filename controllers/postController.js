import Posts from "../db/models/posts.js";
import Users from "../db/models/users.js";
import Categories from "../db/models/categories.js";

// Create a new post
export const createPost = async (req, res) => {
  try {
    const { userId, categoryId, title, content, post_image, published } =
      req.body;

    const newPost = await Posts.create({
      userId,
      categoryId,
      title,
      content,
      post_image,
      published,
    });

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Posts.findAll({
      include: [
        { model: Users, as: "user", attributes: ["username", "email"] },
        { model: Categories, as: "category", attributes: ["category_name", "category_description"] },
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get post by ID
export const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Posts.findByPk(postId, {
      include: [
        { model: Users, as: "user", attributes: ["username", "email"] },
        { model: Categories, as: "category", attributes: ["category_name"] },
      ],
    });

    // Check if post exists
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update post
export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const { title, content, post_image, published, categoryId } = req.body;

    const post = await Posts.findByPk(postId);

    if (post) {
      post.title = title;
      post.content = content;
      post.post_image = post_image;
      post.published = published;
      post.categoryId = categoryId;
      await post.save();
      res.status(200).json(post);
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete post
export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Posts.findByPk(postId);

    if (post) {
      await post.destroy();
      res.status(200).json({ message: "Post deleted successfully" });
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
