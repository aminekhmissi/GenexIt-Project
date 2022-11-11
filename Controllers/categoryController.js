
const Category = require('../Models/category')


addCategory = async (req, res) => {
  const category = new Category(req.body)
  await category.save()
  res.status(200).json({
    msg: 'category Created',
    data: category
  })
}

gettAllCategories = async (req, res) => {

  const category = await Category.find({})

  res.status(200).json({
    data: category,
    msg: 'all categories'
  })
}
getCategoryByid = async (req, res) => {
  const category = await Category.findById({ _id: req.params.id })
  res.status(200).json({ data: category, msg: 'category by id ' })
}
updateCategory = async (req, res) => {
  const category = await Category.findByIdAndUpdate({ _id: req.params.id }, req.body)
  res.status(200).json({
    msg: 'category updated'
  })
}
deleteCategory = async (req, res) => {
  const category = await Category.findByIdAndRemove({ _id: req.params.id })
  res.status(200).json({
    msg: 'category deleted'
  })
} 
