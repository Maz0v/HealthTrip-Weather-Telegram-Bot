const apikey = require("../model/apiKeyModel");
const msgfrequency = require("../model/msgFrequencyModel");
const user = require("../model/userModel")


// function fo add api-keys
const addApiKey = async function (req, res) {
  try {
    const userId = req.params.userId;
    const apiKeys = req.body
    let founduser = await user.findOne({userId:userId})
    //console.log(founduser)
    if(founduser && founduser.admin === true){
        let alreadyExisttelegramApiKey = await apikey.findOne({telegramApiKey : apiKeys.telegramApiKey})
        let alreadyExistWeatherApiKey = await apikey.findOne({weatherApiKey : apiKeys.weatherApiKey})

        
        if(apiKeys.telegramApiKey && apiKeys.weatherApiKey && !alreadyExisttelegramApiKey || !alreadyExistWeatherApiKey){
            let savedApiKeys = await apikey.create(apiKeys)
            console.log(savedApiKeys)
            res.status(201).send({status:true,message:'Api keys stored successfully', data:savedApiKeys})

        }else{
            res.status(400).send({status:false,message:'Please enter new telegram api key & new weather api key'})
        }
       
    }else {
        res.status(400).send({status:false,message:'The user is not an admin, please provide an admin account.'})
    }

  } catch (error) {
    console.log(error.message)
    res.status(500).send({ message: "Failed", error: error.message });
  }
};
//------------functon for view all api keys--------------
const viewApiKey = async function(req,res){
try {
    const userId = req.params.userId;
    let founduser = await user.findOne({userId:userId})
    if(founduser && founduser.admin === true){
        const savedApikeysinDb = await apikey.find({isDeleted:false})
        if(savedApikeysinDb.length > 0){
            res.status(200).send({status:true,message:'These are the all api keys', data:savedApikeysinDb})

        }else if(savedApikeysinDb.length === 0 ){
            res.status(404).send({status:false,message:'Either the keys were delted or not found.'})

        }
    
    }else{
        res.status(400).send({status:false,message:'The user is not an admin, please provide an admin account.'})
    }
    
    } catch (error) {
    console.log(error.message)
    res.status(500).send({ message: "Failed", error: error.message });
}
}

//------------function for update api keys----------------

const updateApiKey = async function(req,res){
    try {
        const userId = req.params.userId;
        //const apiKeys = req.body
        let founduser = await user.findOne({userId:userId})
        const objectId = req.query.objectId
        const newweatherApiKey = req.body.weatherApiKey
        const newtelegramApiKey = req.body.telegramApiKey
        if(founduser && founduser.admin === true){
            let updatedApikey = await apikey.findOneAndUpdate({_id:objectId, isDeleted:false},{telegramApiKey:newtelegramApiKey,weatherApiKey:newweatherApiKey},{ new: true })
            res.status(200).send({status:true,message:'Api key updated successfully', data:updatedApikey})
        }else{
            res.status(400).send({status:false,message:'The user is not an admin, please provide an admin account.'})
        }
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: "Failed", error: error.message });
    }
}


//------------------function for delete api key ----------------
const deleteApiKey = async function(req,res){
    try {
        const userId = req.params.userId;
        let founduser = await user.findOne({userId:userId})
        const objectId = req.query.objectId
        if(founduser && founduser.admin === true){
           let deleteApiKey = await apikey.findByIdAndUpdate({_id:objectId, isDeleted:false},{isDeleted:true},{ new: true })
           res.status(200).send({status:true,message:'Api key deleted successfully'})

        }else{
            res.status(400).send({status:false,message:'The user is not an admin, please provide an admin account.'})
        }
    } catch (error) {
         console.log(error.message)
         res.status(500).send({ message: "Failed", error: error.message });
    }
}

//---------------------functions for  user management -----------------
// -------------------function for view users----------------
const viewUser = async function(req,res){
    try {
        const userId = req.params.userId;
        let founduser = await user.findOne({userId:userId})
        if(founduser && founduser.admin === true){
           let users = await user.find({isDeleted:false})
           if(users.length>0){
            res.status(200).send({status:true,message:'Users found successfully',users:users})
           }else{
            res.status(404).send({status:false,message:'Users not found'})
           }
        }else{
            res.status(400).send({status:false,message:'The user is not an admin, please provide an admin account.'})
        }
    } catch (error) {
        console.log(error.message)
         res.status(500).send({ message: "Failed", error: error.message });
    }
}
//-----function for delte user-----
const deleteUser = async function(req,res){
    try {
        const userId = req.params.userId;
        const deleteUserid =req.query.deleteuid
        let founduser = await user.findOne({userId:userId})
        if(founduser && founduser.admin === true){
            let deleteUser = await user.findOneAndUpdate({userId:deleteUserid,isDeleted:false},{isDeleted:true},{new:true})
            if(deleteUser){
                res.status(200).send({status:true,message:'User deleted successfully'})
            }else{
                res.status(404).send({status:false,message:'User not found'})
            }
            }else{
            res.status(400).send({status:false,message:'The user is not an admin, please provide an admin account.'})
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: "Failed", error: error.message });
    }
}
//--------function for update user------
const updateUser = async function(req,res){
    try {
        const userId = req.params.userId;
        let founduser = await user.findOne({userId:userId})
        let updatedName = req.body.name;
        let updatedCity = req.body.city;
        let updatedCountry = req.body.country;
        let updateUserId = req.query.updateuserid
        if(founduser && founduser.admin === true && updatedName || updatedCity || updatedCountry){
            let userUpdate = await user.findOneAndUpdate({userId:updateUserId,isDeleted:false},{name:updatedName,city:updatedCity,country:updatedCountry},{new:true})
        if(userUpdate){
            res.status(200).send({status:true,message:'User updated successfully',data:userUpdate})
        }else{
            res.status(400).send({status:false,message:'user updation failed'})
        }
        }else{
            res.status(400).send({status:false,message:'The user is not an admin, please provide an admin account.'})
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: "Failed", error: error.message });
    }
}

//------------------function for message frequency view----------------
const viewMessageFrequency = async function(req,res){
try {
    const userId = req.params.userId;
    
    let founduser = await user.findOne({userId:userId})
    if(founduser && founduser.admin === true){
        let fetchMessageFrequency = await msgfrequency.find();
        res.status(200).send({status:true,message:'Message frequency for every user.',data:fetchMessageFrequency})
    }else{
        res.status(400).send({status:false,message:'The user is not an admin, please provide an admin account.'})
    }
} catch (error) {
    console.log(error.message)
    res.status(500).send({ message: "Failed", error: error.message });
}
}

module.exports = { addApiKey,viewApiKey,updateApiKey,deleteApiKey ,viewUser,deleteUser,viewMessageFrequency,updateUser};
