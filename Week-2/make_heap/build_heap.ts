class Heap {
  private data: Array<number>;
  private swaps = []
  private swapsCount = 0;
  private size = 0;

  constructor(data: string) {
		this.data = data.split(' ').map(function(el) { return parseInt(el, 10); });
    this.size = this.data.length;
	}

  enforceRules() {
    for (var i = this.data.length-1; i >= 0; i--) {
        this.siftDown(i + 1);
    }
  }

  parent(i:number):number {
    return parseInt(i/2);
  }

  leftChild(i:number):number {
      return 2 * i;
  }

  rightChild(i:number):number {
      return 2 * i + 1;
  }

  // siftUp(i: number){
  //   while(i > 0 && this.data[i] < this.data[this.parent(i)]) {
  //     this.swap(i, this.parent(i));
  //     i = this.parent(i);
  //   }
  // }

  siftDown(i: number){
    let maxIndex = i;
    let leftChild = this.leftChild(i);
    let rightChild = this.rightChild(i);

    if (leftChild <= this.size && this.data[leftChild - 1] < this.data[maxIndex - 1]) {
      maxIndex = leftChild;
    }

    if (rightChild <= this.size && this.data[rightChild - 1] < this.data[maxIndex - 1]) {
      maxIndex = rightChild;
    }

    if (i !== maxIndex) {
      this.swap(i-1, maxIndex-1)
      this.siftDown(maxIndex);
    }
  }

  swap(i1: number, i2: number) {
    let tmp = this.data[i1];
    this.swaps.push((i1) + ' ' + (i2));
    this.swapsCount += 1;
    this.data[i1] = this.data[i2];
    this.data[i2] = tmp;
  }

  printSwaps() {
    console.log(this.swapsCount);
    for(let i = 0; i < this.swaps.length; i++) {
      console.log(this.swaps[i]);
    }
  }
}

let readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let lineNumber = 1;
rl.on('line', function(line){
	if(lineNumber === 2){
		let heap = new Heap(line);
		heap.enforceRules();
    heap.printSwaps();
		process.exit();
	}
	lineNumber++;
});