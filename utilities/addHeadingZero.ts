export const addHeadingZero = (num: number): string => (num > 9 ? num.toString() : num > 0 ? `0${num}` : '00')

export const addMultipleHeadingZero = (num: number): string =>
	num > 99 ? num.toString() : num > 9 ? `0${num}` : num > 0 ? `00${num}` : '000'
