const router = require('express').Router();
const ensureAuthenticated = require('../Middlewares/Auth')
router.get('/',ensureAuthenticated,(req,res)=>{
    res.status(200).json([
        {
            name:"Mobile",
            price:1000
        },
        {
            name:"TV",
            price:200000
        }
    ])
});
module.exports = router;