const router = require('express').Router();
const { CustomError } = require('@josephdaw/error-handler');
const v1Routes = require('./v1');

// placeholder for base of the API
router.get('/', (req, res)=>{
  return res.status(418).json({
    "error":"server refuses the attempt to brew coffee with a teapot", 
    "translation":"there is nothing useful here, try a different route"})
});

// routes for DB query requests
router.use('/v1', v1Routes);

// add a catch-all route handler for any requests to an unknown route
router.use((req, res, next) => {
    const err = new CustomError('Route Not Found', 404);
    next(err);
});

module.exports = router;