const mongoose = require("mongoose");

const msgFrequencySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    lastMessageSent : {
      type :String,
      required :true
    },
    // nextMessageSend: {
    //   type : String
    // }

  },
  { timestamps: true }
);

module.exports = mongoose.model("msgfrequency",msgFrequencySchema)