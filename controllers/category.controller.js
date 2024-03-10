const category_model = require("../models/category.models.js")
const { Types } = require('mongoose');

//Get body Data
exports.createCategory = async (req,res)=>{
    const request_body = req.body;
    const category_Object ={
        name: request_body.name,
        description: request_body.description
    }
    //Insert into mongo
    try {
        const category = await category_model.create(category_Object)
        //Backend Validation
        if(category)
        {
            return res.status(201).send(category)
        }
        else{

            return res.status(500).send({
                message : "Category Not Created"
            })
        }
    } catch (error) {
        console.log("Failed To Create Category",error)
        return res.status(500).send({
            message : "Category Not Created Internal Server Error"
        })
    }
}

exports.getCategory = async(req,res)=>{
    const categories = await category_model.find({})
    if(categories == null)
    {
        return res.status(401).send({
            message:"No Product is Retrived From Database"
        })
    }
    else{
        res.status(200).send({
            message:"Product Categories Are:",
            categories
        })
    }
}

exports.getSingleCategory = async(req,res)=>{
    const id = req.params.id;
    try {
        const singleCategory = await category_model.findOne({_id:id})
        if(singleCategory)
        {
            return res.status(201).send({
                message: "Fetching Single Category Sucessfull",
                category: singleCategory
            })
        }
        else{
            return res.status(400).send({
                sucess: false,
                message: "Fetching Single Category Failed",
                category: singleCategory
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            sucess: false,
            error,
            message: "Error While Fetching Single Category"
        })
    }
}

exports.updateCategory = async (req,res)=>{
    const categoryId = req.params.id;
    const { name, description } = req.body;
    try {
        const updatedCategory = await category_model.findByIdAndUpdate(
            categoryId,
            { name, description },
            { new: true}
          ); 
          if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
          }
      
          res.status(200).send({ message: 'Category updated successfully', category: updatedCategory });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            sucess: false,
            error,
            message: "Error While Update Category"
        })
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;

        // Validate if categoryId is a valid ObjectId
        if (!Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid category ID',
            });
        }

        // Check if the category exists
        const category = await category_model.findById(categoryId);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found',
            });
        }

        // Delete the category
        const deletedCategory = await category_model.findByIdAndDelete(categoryId);

        if (deletedCategory) {
            return res.status(200).json({
                success: true,
                message: 'Category deleted successfully',
                deletedCategory,
            });
        } else {
            return res.status(500).json({
                success: false,
                message: 'Failed to delete category',
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error,
            message: 'Error while deleting category',
        });
    }
};