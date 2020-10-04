function shift_letter(letter, shift) {
  let charCode = letter.charCodeAt(0);
  if (charCode >= 65 && charCode <= 90) {
    charCode = (charCode - 65 + shift) % 26;
    if (charCode < 0) charCode += 91;
    else charCode += 65;
  }
  if (charCode >= 97 && charCode <= 122) {
    charCode = (charCode - 97 + shift) % 26;
    if (charCode < 0) charCode += 123;
    else charCode += 97;
  }
  return String.fromCharCode(charCode);
}

function code(text, shift) {
  let codedText = '';
  for (let i = 0; i < text.length; i++) {
    codedText += shift_letter(text[i], shift);
  }
  return codedText;
}

module.exports = code;
