var Heap = (function () {
    function Heap(data) {
        this.swaps = [];
        this.swapsCount = 0;
        this.size = 0;
        this.data = data.split(' ').map(function (el) { return parseInt(el, 10); });
        this.size = this.data.length;
    }
    Heap.prototype.enforceRules = function () {
        for (var i = this.data.length - 1; i >= 0; i--) {
            this.siftDown(i + 1);
        }
    };
    Heap.prototype.parent = function (i) {
        return parseInt(i / 2);
    };
    Heap.prototype.leftChild = function (i) {
        return 2 * i;
    };
    Heap.prototype.rightChild = function (i) {
        return 2 * i + 1;
    };
    // siftUp(i: number){
    //   while(i > 0 && this.data[i] < this.data[this.parent(i)]) {
    //     this.swap(i, this.parent(i));
    //     i = this.parent(i);
    //   }
    // }
    Heap.prototype.siftDown = function (i) {
        var maxIndex = i;
        var leftChild = this.leftChild(i);
        var rightChild = this.rightChild(i);
        if (leftChild <= this.size && this.data[leftChild - 1] < this.data[maxIndex - 1]) {
            maxIndex = leftChild;
        }
        if (rightChild <= this.size && this.data[rightChild - 1] < this.data[maxIndex - 1]) {
            maxIndex = rightChild;
        }
        if (i !== maxIndex) {
            this.swap(i - 1, maxIndex - 1);
            this.siftDown(maxIndex);
        }
    };
    Heap.prototype.swap = function (i1, i2) {
        var tmp = this.data[i1];
        this.swaps.push((i1) + ' ' + (i2));
        this.swapsCount += 1;
        this.data[i1] = this.data[i2];
        this.data[i2] = tmp;
    };
    Heap.prototype.printSwaps = function () {
        console.log(this.swapsCount);
        for (var i = 0; i < this.swaps.length; i++) {
            console.log(this.swaps[i]);
        }
    };
    return Heap;
}());
var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
var lineNumber = 1;
rl.on('line', function (line) {
    if (lineNumber === 2) {
        var heap = new Heap(line);
        heap.enforceRules();
        heap.printSwaps();
        process.exit();
    }
    lineNumber++;
});
