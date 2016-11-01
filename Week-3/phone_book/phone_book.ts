class Contact {
    name: string;
    number: string;

    constructor(name: string, number: string) {
        this.name = name;
        this.number = number;
    }
}

class PhoneBook {
    private list: {[key:string]: Contact} = {};
    
    public add(number: string, name: string): void {
        this.list[number] = new Contact(name, number);
    }

    public del(number: string): void {
        delete this.list[number];
    }

    public find(number: string): string {
        let entry = this.list[number]
        return entry ? entry.name : 'not found';
    }
}

let readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let lineNumber = 1;
let maxNumberOfLines = 1;
let phoneBook = new PhoneBook();
rl.on('line', function(line){
    if(lineNumber === 1) {
        maxNumberOfLines = parseInt(line)+1;
    }
    else if(lineNumber <= maxNumberOfLines) {
        let values = line.split(' ')
        let action = values[0];
        let phoneNumber = values[1];
        let contactName = values[2];

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