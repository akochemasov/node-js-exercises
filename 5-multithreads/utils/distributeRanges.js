/**
 * Распределяет диапазон чисел на равные части
 * @param {number} total - Общее количество чисел для обработки
 * @param {number} partsCount - Количество частей для разделения
 * @returns {Array<{start: number, end: number}>} Массив диапазонов для каждой части
 */
export const distributeRanges = (total, partsCount) => {
  const amountPerPart = Math.floor(total / partsCount);
  const ranges = [];

  for (let i = 0; i < partsCount; i++) {
    const start = i * amountPerPart + 1;
    // Последний диапазон включает все оставшиеся числа
    const end = i === partsCount - 1 ? total : (i + 1) * amountPerPart;

    ranges.push({ start, end });
  }

  return ranges;
};
