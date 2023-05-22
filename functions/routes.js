const express = require("express");
const jwt = require("jsonwebtoken");
const {
  loginUser,
  registerUser,
  getUser,
  putUser,
} = require("./controllers/userController.js");
const {
  addProduct,
  getProducts,
  deleteProduct,
} = require("./controllers/productsController.js");
const {
  addClient,
  deleteClient,
  getClients,
} = require("./controllers/clientController.js");
const {
  addInvoice,
  getInvoices,
  deleteInvoice,
  getEditInvoice,
  putInvoice,
} = require("./controllers/invoiceController.js");
const router = express.Router();

// Middleware for verifying JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    res.user = user;
    next();
  });
};
/* 
AUTHENTICATION USER 
*/

// LOGIN USER
router.post("/login", loginUser);
// REGISTER USER
router.post("/register", registerUser);

/* 
PRODUCTS  
*/

// POST
router.post("/addProduct", authenticateToken, addProduct);
// GET
router.get("/products", authenticateToken, getProducts);
// DELETE
router.delete("/products/:productId", authenticateToken, deleteProduct);

/*
CLIENTS
*/

// POST
router.post("/addClient", authenticateToken, addClient);
// GET
router.get("/clients", authenticateToken, getClients);
// DELETE
router.delete("/clients/:clientId", authenticateToken, deleteClient);

/*
INVOICES
*/

// POST
router.post("/addInvoice", authenticateToken, addInvoice);
// GET
router.get("/invoices", authenticateToken, getInvoices);
// GET
router.get("/invoice/:invoiceId", authenticateToken, getEditInvoice);
// DELETE
router.delete("/invoice/:invoiceId", authenticateToken, deleteInvoice);
// PUT
router.put("/invoice/:invoiceId", authenticateToken, putInvoice);

/*
USER
*/

// GET
router.get("/user", authenticateToken, getUser);

// PUT
router.put("/user", authenticateToken, putUser);

module.exports = router;
