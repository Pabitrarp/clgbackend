const category_model = require("../models/category.models.js")
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