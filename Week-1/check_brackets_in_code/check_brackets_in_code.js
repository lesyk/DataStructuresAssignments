var Bracket = (function () {
    function Bracket(bracketType, position) {
        this.bracketType = bracketType;
        this.position = position;
    }
    Bracket.prototype.match = function (char) {
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
    };
    Bracket.isOpened = function (char) {
        return (['[', '{', '('].indexOf(char) !== -1);
    };
    Bracket.isClosed = function (char) {
        return ([']', '}', ')'].indexOf(char) !== -1);
    };
    return Bracket;
}());
function matchBrackets(inputText) {
    if (!inputText) {
        return "Empty String";
    }
    var bracketsStack = [];
    for (var i = 0; i < inputText.length; i++) {
        if (Bracket.isOpened(inputText[i])) {
            bracketsStack.push(new Bracket(inputText[i], i));
        }
        else {
            if (bracketsStack.length === 0 &&
                (Bracket.isOpened(inputText[i]) || Bracket.isClosed(inputText[i]))) {
                return "" + (i + 1);
            }
            else if (Bracket.isClosed(inputText[i])) {
                var lastInStack = bracketsStack.pop();
                if (!lastInStack.match(inputText[i]) && !/^[^\[\{\(\]\}\)]*$/.test(inputText[i])) {
                    return "" + (i + 1);
                }
            }
        }
    }
    if (bracketsStack.length === 0) {
        return 'Success';
    }
    else {
        var lastInStack = bracketsStack.pop();
        return "" + (lastInStack.position + 1);
    }
}
var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
rl.on('line', function (line) {
    console.log(matchBrackets(line));
    process.exit();
});
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
