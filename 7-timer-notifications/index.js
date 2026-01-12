import { notification } from './src/notification.js';
import { timer } from './src/timer.js';

const args = process.argv.slice(2, 5);

timer(
    args, 
    () => {
        notification({title: 'Timer', message: 'Timer is done!'});
    }
);
