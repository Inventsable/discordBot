require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => {
  if (message.content === 'ping') {
    message.reply('pong');
  } else {
    deduce(message)
  }



});

function deduce(message) {  
  let str = message.content;
  let responses = {
    hertha: ['Out of me the years roll;', 'Out of me God and man;', 'I am equal and whole;', 'God changes, and man, and the form of them bodily; I am the soul.'],
    carrolOne: [`that he met in the house, 'Let us both go to law: I will prosecute you - Come, I'll take no denial; We must have a trial: For really this morning I've nothing to do.'`],
    carrolTwo: [`'Such a trial, dear Sir, with no jury or judge, would be wasting our breath.'\r\n\r\n'I'll be judge, I'll be jury,' Said cunning old Fury: 'I'll try the whole cause, and condemn you to death.'`]
  }
  let isHertha = /i\sam\sthat\swhich\sbegan/i.test(str),
    isCarrolOne = /fury\ssaid\sto\sa\smouse/i.test(str),
    isCarrolTwo = /said\sthe\smouse\sto\sthe\scur/i.test(str);
  if (!(isHertha || isCarrolOne || isCarrolTwo)) return null;
  message.channel.send(`${message.author},`, isHertha 
    ? responses.hertha 
    : isCarrolOne 
    ? responses.carrolOne
    : responses.carrolTwo
  );
}


// THIS  MUST  BE  THIS  WAYtha
client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret