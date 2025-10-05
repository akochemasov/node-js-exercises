import addition from './methods/addition.js';
import subtraction from './methods/subtraction.js';
import multiplication from './methods/multiplication.js';
import division from './methods/division.js';

const arg1 = parseFloat(process.argv[2]);
const arg2 = parseFloat(process.argv[3]);
const operation = process.argv[4];

switch (operation) {
    case '+':
        console.log(addition(arg1, arg2));
        break;

    case '-':
        console.log(subtraction(arg1, arg2));
        break;

    case '*':
        console.log(multiplication(arg1, arg2));
        break;

    case '/':
        if (arg2 === 0) {
            console.log('Division by zero is not allowed');
            break;
        } else {
            console.log(division(arg1, arg2));
        }
        break;

    default:
        console.log('Invalid operation');
}
