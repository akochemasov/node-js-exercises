import { parentPort, workerData } from 'worker_threads';
import { countDivisibleBy3 } from './helpers.js';

const compute = () => {
    return countDivisibleBy3(workerData.start, workerData.end);
}

parentPort.postMessage(compute());