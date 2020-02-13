const readline = require('readline');
const util = require('util');
const { persona } = require('./persona');
let rl = readline.createInterface({input: process.stdin, output: process.stdout});

let randNum1 = Math.floor((Math.random() * 10) + 1);
let randNum2 = Math.floor((Math.random() * 10) + 1);
let num1 = 0;
let num2 = 0;
let maxNod = "";
let sum = "Проверить арифметику без смс и регистрации ";
let nod = "Найти общий делитель двух чисел ";
let note = "Добавить человека и его высказывание ";
let getNumberCount = "Подсчитать колличество цифр ";
let peepooPowPow = "Найти степень числа";
let isPoly = "Проверка на палиндром";
let reverseNums = "Развернуть числа";
let answer = randNum1 + randNum2;

const selection = () => {
    rl.question(`\n Выберите юзкейс: \n
        1) ${sum}
        2) ${nod} 
        3) ${note} 
        4) ${getNumberCount}
        5) ${peepooPowPow}
        6) ${isPoly}
        7) ${reverseNums}
        \n
        `
        ,
        (items)=>{
        let currentItem = items;
        switch (currentItem) {
            case "1" : {
                rl.question(`Сумма числа ${randNum1} и числа ${randNum2} равна:  \n`, (userInput)=> {
                    if(userInput.trim() == answer) {
                        rl.setPrompt('Правильно! ');
                        rl.close();
                    } else {
                        rl.setPrompt(`Ваш ответ ${userInput}. Попробуйте еще раз!  \n `);
                        rl.prompt(); 
                        rl.on("line", (userInput) => {
                            if(userInput.trim() == answer) {
                                rl.setPrompt('Правильно! ');
                                rl.close();
                            } else {
                                rl.setPrompt(`Ваш ответ ${userInput}. Попробуйте еще раз!  \n `);
                                rl.prompt(); 
                                rl.on("line", (userInput) => {
                                    const reTry = userInput;
                                    rl.setPrompt(`Ваш ответ ${reTry}. Попробуйте еще раз!  `);
                                    rl.prompt();
                                })
                            }
                        })
                    }
                });
                rl.on('close',()=>{
                    process.exit();
                    return 1;
                })
                break;
            }
            case "2" : {
                 rl.question("Введите два числа ", (n1) => {
                    num1 = n1;
                    rl.on("line", (n2) => {
                        num2 = n2;
                        if(num2 > num1){
                            let temp = num2;
                            num2 = num1;
                            num1 = temp;
                        }
                        for(let i = 1; i <= num2; ++i){
                            if(num1 % i == 0 && num2 % i == 0){
                                maxNod = i;
                            }
                        }
                        rl.close();
                        return 0;
                    })
                })
                rl.on("close", () => {
                    "Максимальное число множитель: " + maxNod
                    rl.setPrompt(`\n "Максимальное число множитель: " + ${maxNod} \n`);
                    rl.prompt();
                    process.exit();
                })
                break;
            }
            case "3" : {
                rl.question('Введите имя: ',(answer) => { 
                    persona.name = answer;
                    rl.setPrompt('Добавьте комментарий ');
                    rl.prompt();
                    rl.on('line', (input) => {
                        persona.desc.push(input.trim());
                        rl.setPrompt(`Есть еще что добавить? ${persona.desc}`);
                        rl.prompt();
                    })
                    rl.on("close", () => {
                        rl.setPrompt(`\n Имя: ${persona.desc} \n Высказывания: ${persona.desc} \n`);
                        rl.prompt();
                        process.exit();
                    })
                })
                break;
            }
            case "4" : {
                rl.question('Введите целое число: ',(answer) => {
                    var n;
                    var count = 0;
                    n = answer;
                    while(n != 0){
                        n = Math.floor(n/10);
                        ++count;
                    }
                    rl.setPrompt(`В целом числе: ${count} цифр(а) \n`);
                    rl.prompt();
                    rl.close();
                    return 0;
                })
                rl.on("close", () => {
                    process.exit();
                    return 1;
                })
                break;
            }
            case "5" : {
                rl.question('Введите число: ',(answer) => {
                    let result = 1;
                    num1 = parseInt(answer);
                    rl.setPrompt(`Введите степень: `);
                    rl.prompt();
                    rl.on("line", (exponent) => {
                        num2 = parseInt(exponent);
                        while(exponent != 0){
                            result *= num1;
                            --exponent;
                        }
                        rl.setPrompt(`Число ${num1} в степени ${num2} = ${result}`);
                        rl.prompt();
                        return 0;
                    })
                })
                rl.on('close',()=>{
                    process.exit();
                    return 1;
                })
                break;
            }
            case '6' : {
                rl.question('Введите числовую последовательность: ',(answer) => {
                    let n, reversed = 0, remainder, orig;
                    n = parseInt(answer);
                    orig = n;
                    
                    while(n !== 0){
                        remainder = Math.floor(n % 10);
                        reversed = reversed*10 + remainder;
                        n = Math.floor(n / 10);
                    }
                    if(orig == reversed) {
                        rl.setPrompt(`Это полиндром \n`);
                        rl.prompt();
                        rl.close();
                        return 0;
                    } else {
                        rl.setPrompt(`Это не полиндром \n`);
                        rl.prompt();
                        rl.close();
                        return 1;
                    }
                    
                })
                break;
            }
            case "7" : {
                rl.question('Введите целое число значение которого надо обратить: ',(answer) => {
                    
                    let n, remainder, reversedNumber = 0;
                    let reversedNumbers = [];
                    n = parseInt(answer);
                    while(n != 0){
                        remainder = Math.floor(n % 10);
                        reversedNumber = reversedNumber*10 + remainder;
                        n = Math.floor(n/10);
                        reversedNumbers.push(reversedNumber);
                    }
                    rl.setPrompt(`Значение: ${reversedNumber} \n`);
                    rl.prompt();
                    rl.close();
                    return 0;
                })
                rl.on("close", () => {
                    process.exit();
                    return 1;
                })
                break;
            }
            default:
                selection();
          }
    });
}
selection();