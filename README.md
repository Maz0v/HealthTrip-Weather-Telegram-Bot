
# DOCUMENTATION FOR TELEGRAM WEATHER BOT
### COMPANY – HEALTHTRIP

#### Requirement = 
Here is your assignment for the first round of screening.

create a Telegram bot using Node.js and MongoDB. The bot should ask first-time users for their name, city, and country, save this information in a MongoDB collection, and send daily weather updates to the users. Additionally, create an admin panel for managing API keys, message frequency, and user blocking/deletion
You are expected to submit the assignment in 3 days, let me know if you need an extension.
### How we create the telegram bot?

Firstly we open the telegram app and search for @BotFather.
Then click on the start button or send “/start”.
Then send “/newbot” message to set up a name and a username.
The BotFather will gave an API token.

### Getting Weather API key:
Secondly we go to open weather map website.
Then create an account as per the limit.
I have received my own API key. By using that api key I can hit the given the weather api and get the weather details.

### Database Schemas
- userModel.js => Stores the user details like name, city, country etc.
- apiKeyModel.js => Stores the telegram api key and weather api key for admin control.
- msgFrequencyModel.js => Stores the frequency of message sending time like lastmessagesent time.

### Controllers
- adminController => In admin controller there are multiple functions like for api key management there are four function which are used in route, like addApiKey, viewApiKey, updateApiKey, deleteApiKey. Same for users and messagefrequency. There are functions which are used to view user,update user etc,
- botController => In botcontroller there is one function botFunnction() => which is basically used to send weather update to the user via bot.

### Routes
#### This endpoints are for admin 
//---------api key routes ------
- /addapikey/:userId => this is used for add api key.
- /viewapikey/:userId => this is used for view api key
- /updateapikey/:userId => this is used for update api key
- /deleteApiKey/:userId => this is used for delete api key
//--------user routes ---------
- /viewusers/:userId => this is used for view users
- /deleteuser/:userId => this is used for delete users
- /updateuser/:userId => this is used for update users
//---------messagefrequency --------
- /viewMessageFrequency/:userId => this is used for view messagefrequency

### ENV
Before starting the project we have to set up the ENV. There are 4 things in ENV.
- TELEGRAM_TOKEN = .........
- WEATHER_API_KEY = .......
- MONGODB_URI = .........
- CRONPER24HOUR = 0 6 * * * (The message will be send everyday at 6am)

### Packages Installed
-  "axios": "^1.6.7",
-  "body-parser": "^1.20.2",
-  "dotenv": "^16.4.5",
-  "express": "^4.18.2",
-  "mongoose": "^8.2.0",
-  "node-cron": "^3.0.3",
-  "nodemon": "^3.1.0",
-  "telegraf": "^4.16.1"

