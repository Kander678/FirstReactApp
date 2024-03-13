const { Router } = require("express");

//jwt
const jwt = require("jsonwebtoken");
const secretKey = 'klucz_do_generowania_tokenow';

const {
    getToDoElement,
    getToDoElements,
    saveToDoElement,
    deleteToDoElement,
    updateToDoElement,
    getToDoCategory,
    getToDoCategories,
    getToDoCategoryByElementID,
    saveToDoCategory,
    deleteToDoCategory,
    updateToDoCategory,
    addNewElementToCategory,
    addToDoElementToCategory
} = require("../controllers/ToDoController");

const router = Router();

//Routes for authentication
router.post('/login',(req,res)=>{
    const{login,password} = req.body;
    if(login === 'user' && password ==='user'){
        const token = jwt.sign({userId:'user_001'},secretKey,{expiresIn:'1h'});
        res.json({token});
    }else{
        res.status(401).json({message: 'Nieprawidłowe dane logowania'});
    }
});

function verifyToken(req,res,next){
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: 'Brak tokena autoryzacyjnego' });
    }
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Nieprawidłowy token autoryzacyjny' });
        }
        req.user = decoded;
        next();
    });
}

router.get('/protected',verifyToken,(req,res)=>{
    res.json({message:'Chronione zasoby'});
});


// Routes for ToDoElement
router.get("/element/:id",verifyToken,getToDoElement);
router.get("/elements",verifyToken,getToDoElements);
router.post("/elements",verifyToken,saveToDoElement);
router.put("/elements/:id",verifyToken, updateToDoElement);
router.delete("/elements/:id",verifyToken,deleteToDoElement);

// Routes for ToDoCategory
router.get("/category/:id",verifyToken, getToDoCategory);
router.get("/categories",verifyToken, getToDoCategories);
router.get("/categoryByElementId/:element_id",verifyToken,getToDoCategoryByElementID);
router.post("/categories",verifyToken,saveToDoCategory);
router.put("/categories/:id",verifyToken, updateToDoCategory);
router.delete("/categories/:id",verifyToken, deleteToDoCategory);

//adding element to category
router.put("/element/to/category/:categoryId",verifyToken,addNewElementToCategory);
router.put("/element_id/to/category_id/:elementId/:categoryId",verifyToken,addToDoElementToCategory);

module.exports = router;