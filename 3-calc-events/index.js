import { EventEmitter } from 'events';

const event = new EventEmitter();

const arg1 = parseFloat(process.argv[2]);
const arg2 = parseFloat(process.argv[3]);
const operation = process.argv[4];

event.on('result', (result) => console.log(result));
event.on('additional', (arg1, arg2) => {
    event.emit('result', arg1 + arg2);
});
event.on('subtraction', (arg1, arg2) => {
    event.emit('result', arg1 - arg2);
});
event.on('multiplication', (arg1, arg2) => {
    event.emit('result', arg1 * arg2);
});
event.on('division', (arg1, arg2) => {
    event.emit('result', arg1 / arg2);
});

switch (operation) {
    case '+':
        event.emit('additional', arg1, arg2)
        break;

    case '-':
        event.emit('subtraction', arg1, arg2)
        break;

    case '*':
        event.emit('multiplication', arg1, arg2)
        break;

    case '/':
        if (arg2 === 0) {
            event.emit('result', 'Division by zero is not allowed')
            break;
        } else {
            event.emit('division', arg1, arg2)
        }
        break;

    default:
        event.emit('result', 'Invalid operation')
}
