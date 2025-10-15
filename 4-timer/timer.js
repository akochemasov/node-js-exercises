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

export const timer = (str1, str2, str3) => {
    console.log('Timer start');

    const totalMs = parseTimeUnit(str1) + parseTimeUnit(str2) + parseTimeUnit(str3);

    setTimeout(() => console.log('Timer stop'), totalMs);
};