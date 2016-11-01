// This implementation is not fast enough :)
class Maker {
  id: number;
  totalTime = 0;
  timeSpent = 0;

  constructor(id: number) {
    this.id = id
  }

  assignJob(jobTime: number) {
    this.totalTime = this.totalTime + jobTime;
    this.timeSpent = jobTime;
  }
}

class JobQueue {
  numberOfWorkers = 0;
  jobs: Array<number> = [];
  workers: Array<Maker> = [];
  globalTimeSpent = 0;

  constructor(line: string) {
    let t = line.split(' ').map(function (el) { return parseInt(el, 10); });
    this.numberOfWorkers = t[0];
  }

  setJobs(line:string){
    this.jobs = line.split(' ').map(function (el) { return parseInt(el, 10); });
  }

  assignJobs() {
    for(let i = 0; i < this.numberOfWorkers; i++) {
      this.workers.push(new Maker(i));
    }

    for(let i = 0; i < this.jobs.length; i++) {
      this.workers = this.workers.sort(function(a, b){
        return a.totalTime > b.totalTime;
      });

      let jobAssigned = false;
      while(jobAssigned == false) {
        for(let workerI = 0; workerI < this.workers.length; workerI++) {
          let worker = this.workers[workerI];

          if(worker.timeSpent === 0) {
            worker.assignJob(this.jobs[i]);
            jobAssigned = true;
            console.log(this.workers[0].id + " " + this.globalTimeSpent);
            break;
          }
          else {
            worker.timeSpent--;

            if(workerI === this.workers.length-1) {
              this.globalTimeSpent++;
            }
          }
        }
      }
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
    q.setJobs(line);
    q.assignJobs();
		process.exit();
	}
	lineNumber++;
});