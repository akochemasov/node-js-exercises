import { parentPort, workerData } from 'worker_threads';
import { countDivisibleBy3 } from './utils/index.js';

const compute = () => {
    return countDivisibleBy3(workerData.start, workerData.end);
}

parentPort.postMessage(compute());