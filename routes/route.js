const express = require('express');
const router = express.Router();

const admincontroller = require("../controller/adminController")
//-------api key routes---------
router.post('/addapikey/:userId',admincontroller.addApiKey)
router.get('/viewapikey/:userId', admincontroller.viewApiKey)
router.put('/updateapikey/:userId', admincontroller.updateApiKey)
router.put('/deleteApiKey/:userId', admincontroller.deleteApiKey )
//--------user routes ---------
router.get('/viewusers/:userId',admincontroller.viewUser)
router.put('/deleteuser/:userId',admincontroller.deleteUser)
router.put('/updateuser/:userId',admincontroller.updateUser)
//---------messagefrequency --------
router.get('/viewMessageFrequency/:userId', admincontroller.viewMessageFrequency)
module.exports = router;