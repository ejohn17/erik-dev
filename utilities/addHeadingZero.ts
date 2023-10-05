export const addHeadingZero = (num: number): string => (num > 9 ? num.toString() : num > 0 ? `0${num}` : '00')
