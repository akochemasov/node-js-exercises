import { PerformanceObserver, performance } from 'perf_hooks';
import { Worker } from 'worker_threads';
import os from 'os';
import { countDivisibleBy3 } from './helpers.js';

const AMOUNT = 3000000;

const obs = new PerformanceObserver((items, observer) => {
  items.getEntries().forEach((entry) => {
    console.log(`${entry.name}: ${entry.duration}ms`)
  });
});
obs.observe({ entryTypes: ['measure'] });

const simple = async () => {
    performance.mark('start-simple');
    const count = countDivisibleBy3(1, AMOUNT);
    console.log(`Simple. Count of numbers divisible by 3: ${count}`);
    performance.mark('end-simple');
    performance.measure('Simple', 'start-simple', 'end-simple');
    await new Promise(resolve => setImmediate(resolve));
}

const multithreaded = async () => {
    const cpuCount = os.cpus().length;
    console.log(`Available CPU cores: ${cpuCount}`);
    const AMOUNT_PER_THREAD = Math.floor(AMOUNT / cpuCount);
    performance.mark('start-multithreaded');
    await Promise.all(
      Array.from({ length: cpuCount }).map((_, index) => {
        return new Promise((resolve, reject) => {
          const worker = new Worker(new URL('./worker.js', import.meta.url), {
            workerData: {
              start: index * AMOUNT_PER_THREAD + 1,
              end: index === cpuCount - 1 ? AMOUNT : (index + 1) * AMOUNT_PER_THREAD,
            },
          });
          worker.on('message', resolve);
          worker.on('error', reject);
          worker.on('exit', (code) => {
            if (code !== 0)
              reject(new Error(`Worker stopped with exit code ${code}`));
          });
        });
      })
    )
      .then((results) => {
        const count = results.reduce((acc, val) => acc + val, 0);
        console.log(`Multithreaded. Count of numbers divisible by 3: ${count}`);
        performance.mark('end-multithreaded');
        performance.measure('Multithreaded', 'start-multithreaded', 'end-multithreaded');
      })
      .catch((err) => console.error(err)); 
}

const main = async () => {
    await simple();

    console.log('');

    await multithreaded(); 
}

main();