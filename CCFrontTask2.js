const runeList = [
  {runeName: 'El', power: 28, impossible: 'Ort'},
  {runeName: 'Eld', power: 33, impossible: 'Sur'},
  {runeName: 'Tir', power: 9, impossible: 'Eth'},
  {runeName: 'Nef', power: 7, impossible: 'Ist'},
  {runeName: 'Eth', power: 31, impossible: 'Tir'},
  {runeName: 'Ith', power: 22, impossible: 'Pul'},
  {runeName: 'Tal', power: 8, impossible: 'Io'},
  {runeName: 'Ral', power: 25, impossible: 'Um'},
  {runeName: 'Ort', power: 18, impossible: 'El'},
  {runeName: 'Thul', power: 13, impossible: 'Sol'},
  {runeName: 'Amn', power: 6, impossible: 'Fal'},
  {runeName: 'Sol', power: 10, impossible: 'Thul'},
  {runeName: 'Shael', power: 17, impossible: 'Lem'},
  {runeName: 'Dol', power: 11, impossible: 'Hel'},
  {runeName: 'Hel', power: 12, impossible: 'Dol'},
  {runeName: 'Io', power: 20, impossible: 'Tal'},
  {runeName: 'Lum', power: 32, impossible: 'Gul'},
  {runeName: 'Ko', power: 27, impossible: 'Mal'},
  {runeName: 'Fal', power: 14, impossible: 'Amn'},
  {runeName: 'Lem', power: 26, impossible: 'Shael'},
  {runeName: 'Pul', power: 15, impossible: 'Ith'},
  {runeName: 'Um', power: 16, impossible: 'Ral'},
  {runeName: 'Mal', power: 21, impossible: 'Ko'},
  {runeName: 'Ist', power: 4, impossible: 'Nef'},
  {runeName: 'Gul', power: 23, impossible: 'Lum'},
  {runeName: 'Vex', power: 24, impossible: 'Ohm'},
  {runeName: 'Ohm', power: 1, impossible: 'Vex'},
  {runeName: 'Lo', power: 2, impossible: 'Cham'},
  {runeName: 'Sur', power: 30, impossible: 'Eld'},
  {runeName: 'Ber', power: 3, impossible: ''},
  {runeName: 'Jah', power: 5, impossible: 'Zod'},
  {runeName: 'Cham', power: 29, impossible: 'Lo'},
  {runeName: 'Zod', power: 19, impossible: 'Jah'}
];

exports.generateRunicWords = length => {
  let runicArray = runeList.slice();
  let runicWords = [];

  if (typeof length !== "number") {  // input validation
    return "Length of rune must be a number!"
  } else if (length < 1) {
    return "Length of rune is too small"
  } else if (length > runeList.length) {
    return "Length of rune is too big"
  } else { // if all is okay
    runicArray = combinations(runicArray, length); // combine runic words for input length
    runicArray.sort((runeA, runeB) => {
      return runeB.power - runeA.power;
    });
    runicWords = validationWords(runicArray);
    return runicWords.slice(0, 10); // return top 10 words for input length
  }

  function combinations(arr, length) { // function which combines runic words
    let runicWords = [];
    let word;
    let power;
    for (let i = 0; i < arr.length; i++) {
      power = 0;
      if (length === 1) {
        word = arr[i].runeName;
        power = arr[i].power - 1;
        runicWords.push({word, power});
      } else {
        let sub = combinations(arr.slice(i + 1, arr.length), length - 1); // recursive call
        for (let subI = 0; subI < sub.length; subI++) {
          power = 0;
          word = arr[i].runeName + '-'; // adding rune name to word array with dash
          word += sub[subI].word;
          power += sub[subI].power; // counting up the power of runic word
          power += arr[i].power - 1;
          runicWords.push({word, power});
        }
      }
    }
    return runicWords;
  }

  function validationWords(arr) { // function which validates runic words
    let validRuneArray = [];
    for (let i = 0; i < arr.length; i++) {
      let singleRunes = arr[i].word.split("-");
      let isCorrect = 0;
      let word = [];
      for (let j = 0; j < runeList.length; j++) {
        for (let k = 0; k < singleRunes.length; k++) {
          if (runeList[j].runeName === singleRunes[k]) {
            word.push(runeList[j]);
          }
        }
      }
      if (word.length === singleRunes.length) {
        for (let j = 0; j < word.length; j++) {
          for (let k = 0; k < word.length; k++) {
            if (word[j].impossible === word[k].runeName) { // if runes are incompatible
              isCorrect = 0;
            } else {
              isCorrect++;
            }
          }
        }
        if (isCorrect / word.length === word.length) {
          validRuneArray.push(arr[i]);
        }
      }
    }
    return validRuneArray
  }
};

exports.checkRunicWord = runicWord => {
  let runicArray = runeList.slice();
  let runicWordObject = 0;
  let words = [];
  let isCorrect = 0;
  let duplicate = 0;

  if (typeof runicWord !== 'string') {
    runicWordObject = "Your runic word must be a string!"
  } else if (runicWord === '') {
    runicWordObject = "Your runic word is Empty!"
  } else {
    let singleRunes = runicWord.split("-");
    for (let i = 0; i < runicArray.length; i++) {
      for (let j = 0; j < singleRunes.length; j++) {
        if (runicArray[i].runeName === singleRunes[j]) { // seraching each rune in initial array
          words.push(runicArray[i]);
        }
      }
    }
    if (words.length !== singleRunes.length) { // if any rune from input word is incorrect
      runicWordObject = "Your runic word is impossible!";
    } else {
      for (let i = 0; i < words.length; i++) {
        for (let j = 0; j < words.length; j++) {
          if (words[i].impossible === words[j].runeName) { // if runes are incompatible
            runicWordObject = "Your runic word is impossible!";
          } else {
            isCorrect++;
          }
          if (words[i].runeName === words[j].runeName) { // if the word contains duplicate
            duplicate ++;
          }
        }
      }
      if(duplicate > words.length) {
        runicWordObject = "Your runic word contains duplicate!";
      } else if (isCorrect / words.length === words.length) {
        for (let i = 0; i < words.length; i++) {
          runicWordObject += words[i].power - 1; // counting up the power of word
        }
      }
    }
  }
  return runicWordObject;
};
