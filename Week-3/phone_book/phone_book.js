var Contact = (function () {
    function Contact(name, number) {
        this.name = name;
        this.number = number;
    }
    return Contact;
}());
var PhoneBook = (function () {
    function PhoneBook() {
        this.list = {};
    }
    PhoneBook.prototype.add = function (number, name) {
        this.list[number] = new Contact(name, number);
    };
    PhoneBook.prototype.del = function (number) {
        delete this.list[number];
    };
    PhoneBook.prototype.find = function (number) {
        var entry = this.list[number];
        return entry ? entry.name : 'not found';
    };
    return PhoneBook;
}());
var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
var lineNumber = 1;
var maxNumberOfLines = 1;
var phoneBook = new PhoneBook();
rl.on('line', function (line) {
    if (lineNumber === 1) {
        maxNumberOfLines = parseInt(line) + 1;
    }
    else if (lineNumber <= maxNumberOfLines) {
        var values = line.split(' ');
        var action = values[0];
        var phoneNumber = values[1];
        var contactName = values[2];
        switch (action) {
            case 'add':
                phoneBook.add(phoneNumber, contactName);
                break;
            case 'del':
                phoneBook.del(phoneNumber);
                break;
            case 'find':
                console.log(phoneBook.find(phoneNumber));
                break;
            default:
                throw new Error('Invalid operation');
        }
    }
    else {
        process.exit();
    }
    lineNumber++;
});
