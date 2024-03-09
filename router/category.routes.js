//CREATE A POST CALL FOR CATEGORY
const category_Controller = require("../controllers/category.controller.js")
const authMiddleWare = require("../middlewares/auth.middleware.js")

module.exports = (app)=>{
    app.post("/ecomm/api/v1/auth/categories",[authMiddleWare.verify_Token,authMiddleWare.isAdmin],category_Controller.createCategory)
}