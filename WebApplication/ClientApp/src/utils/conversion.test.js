 

import { significantDigits, fullWarningMsg } from './conversion';

describe('Conversion utils', () => {
    describe('Significant digits conversion', () => {
        it('Basic conversion', async () => {
            expect(significantDigits(1.2345, 3)).toEqual('1.23');
        });
        it('Small number conversion with round', async () => {
            expect(significantDigits(0.023456, 3)).toEqual('0.0235');
        });
        it('Not adding zeros after decimal point', async () => {
            expect(significantDigits(1.2, 3)).toEqual('1.2'); // and not '1.20'
        });
        it('Not removing significant digits before decimal point', async () => {
            expect(significantDigits(1234.56, 2)).toEqual('1235'); // and not '1200'
        });
        it('Does not alter string', () => {
            expect(significantDigits('s123.456', 2)).toEqual('s123.456');
        });
        it('Does not fail on undefined nor null', () => {
            expect(significantDigits(undefined, 2)).toEqual('');
            expect(significantDigits(null, 2)).toEqual('');
        });
    });

    describe('Warnings message array conversion', () => {
        it('returns null when array is null', () => {
            expect(fullWarningMsg(null)).toEqual(null);
        });
        it('returns null when array is undefined', () => {
            expect(fullWarningMsg(undefined)).toEqual(null);
        });
        it('returns null when array is empty', () => {
            expect(fullWarningMsg([])).toEqual(null);
        });
        it('returns expected, newline delimited, string for array with single item', () => {
            const msg1 = 'Msg 1';
            expect(fullWarningMsg([msg1])).toEqual('Msg 1\nChange of parameters may lead to incorrect results.');
        });
        it('returns  expected, newline delimited, string for array with multiple items', () => {
            const msg1 = 'Msg 1';
            const msg2 = 'Msg 2';
            expect(fullWarningMsg([msg1, msg2])).toEqual('Msg 1\nMsg 2\nChange of parameters may lead to incorrect results.');
        });
    });
});