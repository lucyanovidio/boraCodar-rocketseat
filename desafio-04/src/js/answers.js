let randomNum = number => Math.floor(Math.random() * number);

const yesOrNoAnswers = [
  "Claaaro, friend! Com certeza",
  "Por que não, né? hahaha",
  "Óbvio, bb",
  "Yeeeees",
  "Pode crer!",
];

const emojiAnswers = ["😊", "😁", "🤗", "😘", "😍"];

const genericAnswers = [
  "Não sei dizer, migx",
  "O que você acha?",
  "É, tem isso",
  "Fica aí o questionamento",
  "Isso q é complicado rs",
  "🤷🏽‍♀️",
];

const laughAnswers = ["kkkkk", "hahahaha", "Só bobeira ksksks", "😹", "🤭"];

const defaultAnswers = [
  "Não entendi 🤔",
  "🤔",
  "Me explica melhor",
  "Que?",
  "Como assim?",
  "🤷🏽‍♀️",
];

export { randomNum, yesOrNoAnswers, emojiAnswers, genericAnswers, laughAnswers, defaultAnswers };