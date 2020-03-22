const TelegramBot = require('node-telegram-bot-api')
const fs = require('fs')

// Reading token from a file
try {
  var data = fs.readFileSync('./token.txt', 'utf8')
  console.log(data)
} catch (err) {
  console.error(err)
  process.exit(1)
}

const token = data

const bot = new TelegramBot(token, {polling: true});
bot.on('message', (msg) => {
  
  // Greeting every new member !
  if (msg.chat.type.toString().toLowerCase().includes("group")){
    const msgToReplyId = msg.message_id
    for (i in msg.new_chat_members){
      bot.sendMessage(msg.chat.id,"Welcome to "+msg.new_chat_members[i].first_name+" (@"+msg.new_chat_members[i].username+")!",{"reply_to_message_id": `${msgToReplyId}`});
    }
  }
      
  });