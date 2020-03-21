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
    ? responses.hertha.join('\r\n')
    : isCarrolOne 
    ? responses.carrolOne.join('')
    : responses.carrolTwo.join('')
  );
}

function random(min = 1, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const randomInteger = (min, max) => {
  const range = max - min;
  const maxGeneratedValue = 0xFFFFFFFF;
  const possibleResultValues = range + 1;
  const possibleGeneratedValues = maxGeneratedValue + 1;
  const remainder = possibleGeneratedValues % possibleResultValues;
  const maxUnbiased = maxGeneratedValue - remainder;
  if (!Number.isInteger(min) || !Number.isInteger(max) ||
    max > Number.MAX_SAFE_INTEGER || min < Number.MIN_SAFE_INTEGER) {
    throw new Error('Arguments must be safe integers.');
  } else if (range > maxGeneratedValue) {
    throw new Error(`Range of ${range} (from ${min} to ${max}) > ${maxGeneratedValue}.`);
  } else if (max < min) {
    throw new Error(`max (${max}) must be >= min (${min}).`);
  } else if (min === max) {
    return min;
  }

  let generated;
  do {
    generated = crypto.getRandomValues(new Uint32Array(1))[0];
  } while (generated > maxUnbiased);

  return min + (generated % possibleResultValues);
};


// THIS  MUST  BE  THIS  WAYtha
client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret