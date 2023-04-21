import Category from '../../../database/models/Category.js';

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().select(
      'categoryName categoryBrief surveys'
    );

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message,
    });
  }
};

export default getCategories;
