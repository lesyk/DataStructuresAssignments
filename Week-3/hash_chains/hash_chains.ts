class HashTable {
  private prime = 1000000007;
  private constant = 263;
  private buckets: number;
  private table: {[key:string]: string[]} = {};

  constructor(buckets: number) {
    this.buckets = buckets;
  }

  private encode(word: string): string {
    let hash = word.split('').map( (char, index) => {
      return char.charCodeAt(0) * Math.pow(this.constant, index);
    }).reduce( (prev, cur) => {
      return cur + prev;
    });

    return (((hash % this.prime) + this.prime) % this.prime % this.buckets).toString();
  }

  private has(word: string): boolean {
    let wordHash = this.encode(word);
    
    if (!this.table[wordHash] || !this.table[wordHash].length) {
      return false;
    }

    return this.table[wordHash].indexOf(word) === -1 ? false : true;
  }
    
  public add(word: string) {
    if (this.has(word)) {
      return;
    }

    let wordHash = this.encode(word);
    if (!this.table[wordHash] || !this.table[wordHash].length) {
      this.table[wordHash] = [];
    }

    this.table[wordHash].push(word);
  }

  public del(word: string) {
    if (!this.has(word)) {
      return;
    }

    let wordHash = this.encode(word);
    this.table[wordHash].splice(this.table[wordHash].indexOf(word), 1);
  }

  public find(word: string): string {
    return this.has(word) ? 'yes' : 'no';
  }

  public check(hashValue: string): string {
    if (!this.table[hashValue] || !this.table[hashValue].length) {
      return '';
    }

    return this.table[hashValue].reverse().join(' ').trim();
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
let hashTable: HashTable;

rl.on('line', function(line){
  if(lineNumber === 1) {
    hashTable = new HashTable(parseInt(line));
  }
  else if(lineNumber === 2) {
    maxNumberOfLines = parseInt(line)+2;
  }
  else if(lineNumber <= maxNumberOfLines) {
    let values = line.split(' ');
    let action = values[0];
    let value = values[1];
    
    switch (action) {
      case 'add':
        hashTable.add(value);
        break;
      case 'del':
        hashTable.del(value);
        break;
      case 'find':
        console.log(hashTable.find(value));
        break;
      case 'check':
        console.log(hashTable.check(value));
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