import Categories from "../db/models/categories.js";

// Create a new category
export const createCategory = async (req, res) => {
  try {
    const { category_name, category_description } = req.body;

    const newCategory = await Categories.create({
      category_name,
      category_description,
    });

    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Categories.findAll({
      include: [
        {
          model: Posts,
          as: "posts",
          include: [
            { model: Users, as: "user", attributes: ["username", "email"] },
          ],
        },
      ],
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get category by ID
export const getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Categories.findByPk(categoryId);

    // Check if category exists
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update category
export const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const { category_name, category_description } = req.body;
    const category = await Categories.findByPk(categoryId);
    if (category) {
      category.category_name = category_name;
      category.category_description = category_description;
      await category.save();
      res.status(200).json(category);
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete category
export const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Categories.findByPk(categoryId);
    if (category) {
      await category.destroy();
      res.status(200).json({ message: "Category deleted successfully" });
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
