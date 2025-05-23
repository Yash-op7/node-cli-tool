#!/usr/bin/env node

import chalk from 'chalk'; // Importing chalk for colored console output
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation'; // Importing chalk-animation for animated text
import figlet from 'figlet';
import {createSpinner} from 'nanospinner';

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms)); // Function to create a delay

// welcome screen will animate the text: welcome to the cli game
async function welcome() {
  const title = chalkAnimation.rainbow('Welcome to the CLI!');
await sleep();
  title.stop();
  console.log(`
    ${chalk.bgCyanBright('CLI-game')} ${chalk.bgCyanBright('v1.0')}
    ${chalk.bgYellow('Author: Yash-op7@github')}
    ${chalk.bgRed('Description: A simple CLI application')}
  `);
}

async function askName() {
  const answers = await inquirer.prompt({
    name: 'player_name',
    type: 'input',
    message: 'What is your name?',
    default() {
      return 'Player';
    },
  });
  playerName = answers.player_name;
  console.log(`Hello, ${playerName}!`);
}

await welcome(); // Call the welcome function
await askName(); // Call the askName function

async function question1() {
  const question1 = await inquirer.prompt({
    name: 'question1',
    type: 'list',
    message: 'What is the capital of France?',
    choices: ['Paris', 'London', 'Berlin', 'Madrid'],
  });
  
  return handleAnswer(question1.question1 == 'Paris');
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner('Checking answer...').start(); // Create a spinner to show loading state
  await sleep(); // Simulate a delay for checking the answer

  if (isCorrect) {
    spinner.success({text: 'Correct answer!'});
  } else {
    spinner.error({text: 'Wrong answer, game over! 💀'});
    process.exit(1); // Exit the process if the answer is wrong
  }
}

await question1(); // Call the question1 function

function winner() {
    console.clear();
    const msg = `Congrats, ${playerName}!\n $ 1, 0 0 0 , 0 0 0`;
    figlet(msg, (err, data) => {
        if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
        }
        console.log(gradient.pastel.multiline(data));
    });
}

winner();