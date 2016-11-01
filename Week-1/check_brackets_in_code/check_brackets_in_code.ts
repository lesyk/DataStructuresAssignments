class Bracket {
  bracketType: string;
  position: number;

  constructor(bracketType: string, position: number) {
    this.bracketType = bracketType;
    this.position = position;
  }

  match(char:string) {
    if (this.bracketType === '[' && char === ']') {
      return true;
    }
    else if (this.bracketType === '{' && char === '}') {
      return true;
    }
    else if (this.bracketType === '(' && char === ')') {
      return true;
    }
    return false;
  }

  static isOpened(char: string) {
    return (['[', '{', '('].indexOf(char) !== -1);
  }

  static isClosed(char: string) {
    return ([']', '}', ')'].indexOf(char) !== -1);
  }
}

function matchBrackets(inputText: string): string {
  if (!inputText) {
    return "Empty String";
  }

  let bracketsStack: Array<Bracket> = [];

  for (let i = 0; i < inputText.length; i++) {
    if (Bracket.isOpened(inputText[i])) {
      bracketsStack.push(new Bracket(inputText[i], i));
    }
    else {
      if (bracketsStack.length === 0 &&
        (Bracket.isOpened(inputText[i]) || Bracket.isClosed(inputText[i]))) {
        return `${i + 1}`;
      }
      else if (Bracket.isClosed(inputText[i])) {
        let lastInStack = bracketsStack.pop();
        if (!lastInStack.match(inputText[i]) && !/^[^\[\{\(\]\}\)]*$/.test(inputText[i])) {
            return `${i + 1}`;
        }
      }
    }
  }
  if (bracketsStack.length === 0) {
    return 'Success';
  }
  else {
    let lastInStack = bracketsStack.pop();
    return `${lastInStack.position + 1}`;
  }
}

let readline = require('readline');
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', function(line){
    console.log(matchBrackets(line));
    process.exit();
})

// const testFolder = './tests/';
// const fs = require('fs');
// fs.readdir(testFolder, (err, files) => {
//   files.forEach(file => {
//     fs.readFile(testFolder+file, 'utf8', (err, data) => {
//       if (err) throw err;
//       console.log(matchBrackets(data));
//     });
//   });
// })