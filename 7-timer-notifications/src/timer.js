export const parseTimeUnit = (str) => {
    if (!str) {
        return 0;
    }

    // if it's just a number - treat as milliseconds
    if (typeof str === 'number') {
        return str;
    }

    // if it's just a string - treat as milliseconds
    const num = Number(str);
    if (!isNaN(num)) {
        return num;
    }

    const units = {
        'h': 60 * 60 * 1000,
        'm': 60 * 1000,
        's': 1000
    };

    const lastChar = str.slice(-1);
    if (units[lastChar]) {
        return parseInt(str) * units[lastChar];
    }

    return 0;
};

export const timer = (args, callback) => {
    console.log('Timer start');

    const totalMs = args.reduce((acc, arg) => acc + parseTimeUnit(arg), 0);

    setTimeout(() => {
        console.log('Timer stop');
        callback();
    }, totalMs);
};