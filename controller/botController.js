const { Telegraf } = require("telegraf");
const axios = require("axios");
const cron = require("node-cron");
const users = require("../model/userModel");
const msgfrequency = require("../model/msgFrequencyModel")
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
const CRONPER24HOUR = process.env.CRONPER24HOUR;


const botFunction = async function () {
   const sendWeatherUpdates = async () => {
    try {
      const allUsers = await users.find({isDeleted:false});
      for (const user of allUsers) {
        if (user.city && user.country) {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${user.city},${user.country}&APPID=${WEATHER_API_KEY}`
          );
          const weatherData = response.data;
          const weatherDescription = weatherData.weather[0].description;
          const temperature = Math.round(weatherData.main.temp - 273.15); // Convert Kelvin to Celsius
          await bot.telegram.sendMessage(
            user.userId,
            `Hey ${user.name}: The weather in ${user.city}, ${user.country} is ${weatherDescription}. The temperature is ${temperature}°C.`
          );
          const lastMessageSent = new Date()
          if(lastMessageSent){
           let userId = user._id
            const storeLastMessageTime = await msgfrequency.create({userId:userId,lastMessageSent:lastMessageSent})
          }
        }
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  // Schedule the weather update job to run every minute
  cron.schedule(CRONPER24HOUR, sendWeatherUpdates);

  // Bot logic
  bot.use(async (ctx, next) => {
    const userId = ctx.from.id;
    let user = await users.findOne({ userId:userId,isDeleted:false });
    if (!user) {
      user = new users({ userId });
      await user.save();
      ctx.reply("Welcome to HealthTrip Weather Bot! What is your name?");
    } else if (!user.name) {
      user.name = ctx.message.text;
      await user.save();
      ctx.reply("Got it! Which city do you live in?");
    } else if (!user.city) {
      user.city = ctx.message.text;
      await user.save();
      ctx.reply("Great! Can you please tell me your country name?");
    } else if (!user.country) {
      user.country = ctx.message.text;
      await user.save();
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${user.city},${user.country}&APPID=${WEATHER_API_KEY}`
        );
        const weatherData = response.data;
        const weatherDescription = weatherData.weather[0].description;
        const temperature = Math.round(weatherData.main.temp - 273.15); // Convert Kelvin to Celsius
        ctx.reply(
          `Welcome, ${user.name}! The current weather in ${user.city}, ${user.country} is ${weatherDescription}. The temperature is ${temperature}°C.`
        );
        const lastMessageSent = new Date()
        if(lastMessageSent){
         let userId = user._id
          const storeLastMessageTime = await msgfrequency.create({userId:userId,lastMessageSent:lastMessageSent})
        }
      } catch (error) {
        console.error("Error fetching weather:", error);
        ctx.reply(
          "Sorry, something went wrong while fetching the weather information."
        );
      }
    } else if(ctx.message.text) {
      ctx.reply("Thanks for contacting HealthTrip weather bot. we will update you with the weather details within 24 hours.");
    }
    return next();
  });

  bot.launch();
};

module.exports = botFunction;
