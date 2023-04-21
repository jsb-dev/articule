import Category from '../../../database/models/Category.js';

const getCategory = async (req, res) => {
  try {
    const { category } = req.query;

    const categoryData = await Category.findOne({ categoryName: category });

    if (!categoryData) {
      return res.status(404).json({ message: 'Category not found.' });
    }

    const { categoryBrief, surveys } = categoryData;

    res.json({ categoryBrief, surveys });
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ message: 'Error fetching category.' });
  }
};

export default getCategory;
