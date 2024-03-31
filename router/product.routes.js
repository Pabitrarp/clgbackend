const authMiddleware = require("../middlewares/auth.middleware.js")
const productController = require("../controllers/product.controller.js")
const formidable = require("express-formidable")

//Api End Point For Product

module.exports = (app)=>{
    //create product
    app.post("/ecomm/api/v1/auth/product",[authMiddleware.verify_Token,authMiddleware.isAdmin,formidable()],productController.createProduct)

    //Get Products
    app.get("/ecomm/api/v1/auth/getProduct",productController.getAllProducts)

    //Get Single Product
    app.get("/ecomm/api/v1/auth/singleProduct/:name",productController.getSingleProducts)

    //update products
    app.put("/ecomm/api/v1/auth/updateProduct/:productId",[authMiddleware.verify_Token,authMiddleware.isAdmin,formidable()],productController.updateProduct)

    //get photo
    app.get("/ecomm/api/v1/auth/productPhoto/:pid",productController.productPhotoController)

    //delete product
    app.delete(
        "/ecomm/api/v1/auth/deleteProduct/:id",
        [authMiddleware.verify_Token, authMiddleware.isAdmin],
        productController.deleteProduct
      );
}