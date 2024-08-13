function generateTsCode(lastCode, prefix = 'TS-', codeLength = 4) {
  // Default to the first code if no lastCode is provided
  if (!lastCode || lastCode.length < prefix.length + 1) {
    return `${prefix}A${'0'.repeat(codeLength - 1)}1`;
  }

  const lastLetter = lastCode[prefix.length];
  const lastNumber = parseInt(lastCode.slice(prefix.length + 1), 10);

  let newNumber, newLetter;

  if (lastNumber < 10 ** codeLength - 1) {
    newNumber = lastNumber + 1;
    newLetter = lastLetter;
  } else {
    newNumber = 1;
    newLetter = lastLetter !== 'Z' ? String.fromCharCode(lastLetter.charCodeAt(0) + 1) : 'A';
  }

  // Pad number with leading zeros
  const paddedNumber = String(newNumber).padStart(codeLength, '0');
  const newCode = `${prefix}${newLetter}${paddedNumber}`;
  return newCode;
}

// Example usage:
const codes = [
  { lastCode: null, expected: 'TS-A0001' },  // No previous code
  { lastCode: 'TS-A0004', expected: 'TS-A0005' },  // Increment number
  { lastCode: 'TS-A9999', expected: 'TS-B0001' },  // Roll over to next letter
  { lastCode: 'TS-Z9999', expected: 'TS-A0001' }   // Roll over to start over
];

// Test cases
codes.forEach(({ lastCode, expected }) => {
  const generatedCode = generateTsCode(lastCode);
  console.log(`Last Code: ${lastCode} => Generated Code: ${generatedCode} (Expected: ${expected})`);
});
