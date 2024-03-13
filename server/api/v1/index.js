const router = require('express').Router();
const usersRoutes = require('./routes/users-routes');
const storesRoutes = require('./routes/stores-routes');
const itemsRoutes = require('./routes/items-routes');

// placeholder for base of the API
router.get('/', (req, res)=>{
  return res.status(418).json({
    "error":"server refuses the attempt to brew coffee with a teapot", 
    "translation":"there is nothing useful here, try a different route"})
});

// routes for DB query requests
router.use('/users', usersRoutes);
router.use('/stores', storesRoutes);
router.use('/items', itemsRoutes);




module.exports = router;