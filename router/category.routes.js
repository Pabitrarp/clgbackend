//CREATE A POST CALL FOR CATEGORY
const category_Controller = require("../controllers/category.controller.js");
const authMiddleWare = require("../middlewares/auth.middleware.js");

//Create Category Route
module.exports = (app) => {
    //Create Category
    app.post("/ecomm/api/v1/auth/categories", [authMiddleWare.verify_Token, authMiddleWare.isAdmin], category_Controller.createCategory);
    
    //Get All Category
    app.get("/ecomm/api/v1/auth/allCategories", [authMiddleWare.verify_Token, authMiddleWare.isAdmin], category_Controller.getCategory);
    
    //Get Single Category
    app.get("/ecomm/api/v1/auth/singleCategories/:id", [authMiddleWare.verify_Token, authMiddleWare.isAdmin], category_Controller.getSingleCategory);

    //Update Category
    app.put("/ecomm/api/v1/auth/updateCategories/:id", [authMiddleWare.verify_Token, authMiddleWare.isAdmin], category_Controller.updateCategory);
    
    //Delete Category
    app.delete("/ecomm/api/v1/auth/deleteCategories/:id", [authMiddleWare.verify_Token, authMiddleWare.isAdmin], category_Controller.deleteCategory);
};
