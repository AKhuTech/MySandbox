const { Router } = require("express");
const Category = require("../models/Category");
const auth = require("../middleware/auth.middleware");
const router = Router();

//api/categories/add-category
router.post("/add-category", auth, async (req, res) => {
    try {
        const {categoryName, categoryDescription, categoryComment} = req.body;
        
        if (!categoryName || !categoryDescription){
            return res.status(400).json({message: "Incorrect data. Category Name and Category Description are required"});
        }

        const candidate = await Category.findOne({name: categoryName});

        if (candidate){
            console.log(candidate);
            return res.status(400).json({message: "Incorrect data. Category Name must be unique"})
        }

        const newCategory = new Category({
            name: categoryName,
            description: categoryDescription,
            comment: categoryComment
        });

        await newCategory.save();
        return res.status(201).json(newCategory);
    } catch (error) {
        if (error.name === "ValidationError"){
            res.status(400).json({message: "Incorrect data"});
        }
        res.status(500).json({message: "Internal Server Error"});
    }
});

//api/categories/search-category
router.get("/search-category", auth, async (req, res) => {
    try {
        const categories = await Category.find();
        return res.json({categories, message: "OK"});
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }
});

//api/categories/category/:id
router.get("/category/:id", auth, async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        return res.json({category, message: "OK"});
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }
});

//api/categories/delete-category/:id
router.delete("/delete-category/:id", auth, async (req, res) => {
    try {
        const category = await Category.findByIdAndRemove(req.params.id);
        return res.json({category, message: "OK"});
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }
});

//api/categories/update-category/:id
router.put("/update-category/:id", auth, async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, {
            {
                name: categoryName,
                description: categoryDescription,
                comment: categoryComment
            }
        });
        return res.json({category, message: "OK"});
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }
});

module.exports = router;
