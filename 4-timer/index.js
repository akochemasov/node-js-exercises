import { timer } from './timer.js';

const arg1 = process.argv[2];
const arg2 = process.argv[3];
const arg3 = process.argv[4];

if (arg1 || arg2 || arg3) {
    timer(arg1, arg2, arg3);
}
