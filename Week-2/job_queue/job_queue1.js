// This implementation is not fast enough :)
var Maker = (function () {
    function Maker(id) {
        this.totalTime = 0;
        this.timeSpent = 0;
        this.id = id;
    }
    Maker.prototype.assignJob = function (jobTime) {
        this.totalTime = this.totalTime + jobTime;
        this.timeSpent = jobTime;
    };
    return Maker;
}());
var JobQueue = (function () {
    function JobQueue(line) {
        this.numberOfWorkers = 0;
        this.jobs = [];
        this.workers = [];
        this.globalTimeSpent = 0;
        var t = line.split(' ').map(function (el) { return parseInt(el, 10); });
        this.numberOfWorkers = t[0];
    }
    JobQueue.prototype.setJobs = function (line) {
        this.jobs = line.split(' ').map(function (el) { return parseInt(el, 10); });
    };
    JobQueue.prototype.assignJobs = function () {
        for (var i = 0; i < this.numberOfWorkers; i++) {
            this.workers.push(new Maker(i));
        }
        for (var i = 0; i < this.jobs.length; i++) {
            this.workers = this.workers.sort(function (a, b) {
                return a.totalTime > b.totalTime;
            });
            var jobAssigned = false;
            while (jobAssigned == false) {
                for (var workerI = 0; workerI < this.workers.length; workerI++) {
                    var worker = this.workers[workerI];
                    if (worker.timeSpent === 0) {
                        worker.assignJob(this.jobs[i]);
                        jobAssigned = true;
                        console.log(this.workers[0].id + " " + this.globalTimeSpent);
                        break;
                    }
                    else {
                        worker.timeSpent--;
                        if (workerI === this.workers.length - 1) {
                            this.globalTimeSpent++;
                        }
                    }
                }
            }
        }
    };
    return JobQueue;
}());
var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
var lineNumber = 1;
var q;
rl.on('line', function (line) {
    if (lineNumber === 1) {
        q = new JobQueue(line);
    }
    if (lineNumber === 2) {
        q.setJobs(line);
        q.assignJobs();
        process.exit();
    }
    lineNumber++;
});
