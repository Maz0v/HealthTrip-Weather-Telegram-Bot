const mongoose = require("mongoose");

const apiKeySchema = new mongoose.Schema(
  {
    telegramApiKey: {
      type: String,
     // required: true,
    },

    weatherApiKey: {
      type: String,
     //required: true,
    },

    isDeleted : {
      type : Boolean,
      default : false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("apikey",apiKeySchema)