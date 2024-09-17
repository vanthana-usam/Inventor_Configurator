 

// returns string representing passed in number with at least minimumDigits significant digits,
// without removing any significant digits before decimal point and
// without adding any zeros after decimal point
export const significantDigits = (number, minimumDigits) => {
    if(number == null) {
        return '';
    }
    if(isNaN(number)) {
        return number;
    }
    const digitsBeforeDecimal = Math.floor(Math.log10(number)+1.0);
    const trueSignificantDigits = digitsBeforeDecimal > minimumDigits ? digitsBeforeDecimal : minimumDigits;
    // is the number, as is, shorter than required digits? don't add anything
    const strLen = number.toString().length;
    const hasDecimal = strLen > digitsBeforeDecimal;
    if(hasDecimal && strLen-1 < trueSignificantDigits /* for the decimal point */) {
        return number.toString();
    }

    return number.toPrecision(trueSignificantDigits);
};

// converts an array of (adoption) warnings into the final, single warning string
export const fullWarningMsg = ( warningsArray ) => {
    if (!(warningsArray?.length > 0))
        return null;

    const newArray = [ ...warningsArray, 'Change of parameters may lead to incorrect results.' ];
    return newArray.join('\n');
};