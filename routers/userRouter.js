const express = require('express')

const router = express.Router()

module.exports = (controller, auth) => {
    router.get('/',(req,res)=>
    {res.render(`user`)});

    return router;
  };