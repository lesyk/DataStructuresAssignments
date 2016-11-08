class TreeOrders {
  n: number;
  key: Array<number> = [];
  left: Array<number> = [];
  right: Array<number> = [];

  public add(line, key, left, right) {
    this.key[line] = key
    this.left[line] = left
    this.right[line] = right

    // console.log("key", this.key);
    // console.log("left", this.left);
    // console.log("right", this.right);
  }

  public inOrderTraverse(result: Array<number>, nodeIndex: number) {
    if(nodeIndex == -1) {
      return;
    }

    let key = this.key[nodeIndex];
    let left = this.left[nodeIndex];
    let right = this.right[nodeIndex];

    this.inOrderTraverse(result, left);
    result.push(key);
    this.inOrderTraverse(result, right);
  }

  public preOrderTraverse(result: Array<number>, nodeIndex: number) {
    if(nodeIndex == -1) {
      return;
    }

    let key = this.key[nodeIndex];
    let left = this.left[nodeIndex];
    let right = this.right[nodeIndex];

    result.push(key);
    this.preOrderTraverse(result, left);
    this.preOrderTraverse(result, right);
  }

  public postOrderTraverse(result: Array<number>, nodeIndex: number) {
    if(nodeIndex == -1) {
      return;
    }

    let key = this.key[nodeIndex];
    let left = this.left[nodeIndex];
    let right = this.right[nodeIndex];

    this.postOrderTraverse(result, left);
    this.postOrderTraverse(result, right);
    result.push(key);
  }
}

let readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let lineNumber = 0;
let maxNumberOfLines = 1;
let tree = new TreeOrders();

rl.on('line', function(line){
  if(lineNumber === 0) {
    maxNumberOfLines = parseInt(line)+1;
    lineNumber =+ 1;
  }
  else if(lineNumber <= maxNumberOfLines) {
    // console.log("lineNumber",lineNumber)
    // console.log("maxNumberOfLines",maxNumberOfLines)
    let values = line.split(' ');
    tree.add(lineNumber-2, values[0], values[1], values[2]);
  }
  if(lineNumber === maxNumberOfLines && tree.key.length !== 0) {   
    let inO = [];
    let preO = [];
    let postO = [];

    tree.inOrderTraverse(inO, 0);
    tree.preOrderTraverse(preO, 0);
    tree.postOrderTraverse(postO, 0);

    console.log(inO.toString().replace(/,/g, " "));
    console.log(preO.toString().replace(/,/g, " "));
    console.log(postO.toString().replace(/,/g, " "));
    
    process.exit();
  }
  
  lineNumber++;
});