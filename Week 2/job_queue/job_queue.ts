class Maker {
  id: number;
  priority = 0;

  constructor(id: number) {
    this.id = id
  }
}

class Heap {
  data: Array<Maker> = [];
  private swaps = []
  private swapsCount = 0;
  size = 0;

  insert(id: number) {
    this.data[this.size] = new Maker(id);
    this.siftUp(this.size);
    this.size++;
  }

  parent(i:number):number {
    if(i === 0){
      return 0;
    }
    else {
      return parseInt(i/2);
    }
  }

  leftChild(i:number):number {
      return (2 * i)+1;
  }

  rightChild(i:number):number {
      return (2 * i) + 2;
  }

  siftUp(i: number){
    while(i > 0 && this.data[i].priority < this.data[this.parent(i)].priority) {
      this.swap(i, this.parent(i));
      i = this.parent(i);
    }
  }

  getMax():Maker {
    return this.data[0];
  }

  siftDown(i: number){
    let maxIndex = i;
    let leftChild = this.leftChild(i);
    let rightChild = this.rightChild(i);

    if (leftChild < this.size && this.data[leftChild].priority < this.data[maxIndex].priority) {
      maxIndex = leftChild;
    }

    if (rightChild < this.size && this.data[rightChild].priority < this.data[maxIndex].priority) {
      maxIndex = rightChild;
    }

    if (i !== maxIndex) {
      this.swap(i, maxIndex)
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

  exctractMax():Maker {
    let res = this.data[0];
    this.data[0] = this.data[this.size-1];
    this.data.pop();
    this.size--;
    this.siftDown(0);
    return res;
  }

  changePriority(i, p){
    let oldP = this.data[i].priority;
    this.data[i].priority = p;
    if(p > oldP) {
      this.siftDown(i);
    }
    else {
      this.siftUp(i);
    }
  }
}

// let h = new Heap()
// h.insert(1)
// h.insert(2)
// h.insert(3)
// h.insert(4)
// h.insert(5)
// console.log(h.data)
// console.log(h.getMax())
// console.log(h.exctractMax())
// console.log(h.data)
// console.log(h.getMax())

class JobQueue {
  numberOfWorkers = 0;
  globalTimeSpent = 0;
  assignWorkers = [];
  startTimes = [];
  next_free_time: Array<number> = [];
  jobs = [];
  workers = new Heap();

  constructor(line: string) {
    let t = line.split(' ').map(function (el) { return parseInt(el, 10); });
    this.numberOfWorkers = t[0];
  }

  setJobs(line:string){
    this.jobs = line.split(' ').map( (el) => { return (parseInt(el, 10)) });
  }

  assignJobs() {
    for(let i = 0; i < this.numberOfWorkers; i++) {
      this.workers.insert(i);
    }

    for(let i = 0; i < this.jobs.length; i++) {
      let duration = this.jobs[i];
      let worker = this.workers.getMax();
      this.assignWorkers[i] = worker.id;
      if(this.next_free_time[worker.id] === undefined) {
        this.next_free_time[worker.id] = 0;
      }
      this.startTimes[i] = this.next_free_time[worker.id];
      let time = worker.priority+duration;
      this.next_free_time[worker.id] =+ time;
      this.workers.changePriority(0, time)
    }
  }

  printQ() {
    for(let i = 0; i<this.jobs.length; i++){
      console.log(this.assignWorkers[i]+ " "+this.startTimes[i]);
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
let q: JobQueue;
rl.on('line', function(line){
  if(lineNumber === 1) {
    q = new JobQueue(line);
  }
	if(lineNumber === 2){
    // console.time('100-elements');
    q.setJobs(line);
    q.assignJobs();
    q.printQ();
    // console.timeEnd('100-elements');
		process.exit();
	}
	lineNumber++;
});