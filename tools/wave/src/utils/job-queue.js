const EventEmitter = require("events");

const QUEUE_EMPTY_EVENT = "queue_empty_event";

module.exports = class JobQueue {
  constructor(limit, { waitingTime = 0, groupLimit = 1 } = {}) {
    this._jobs = [];
    this._processingJobs = false;
    this._limit = limit;
    this._groupLimit = groupLimit;
    this._waitingTime = waitingTime;
    this._runningJobs = 0;
    this._runningGroupJobs = {};
    this._eventEmitter = new EventEmitter();
  }

  async _processJobs() {
    if (this._processingJobs) {
      return;
    }
    this._processingJobs = true;

    while (this.totalJobs() > 0) {
      if (this._runningJobs < this._limit) {
        const job = this._nextJob();
        this._runJob(job)
          .then(() => this._runningJobs--)
          .catch(console.error);
        this._runningJobs++;

        const { group } = job;
        if (!group) continue;
        while (this._runningGroupJobs[group] < this._groupLimit) {
          const nextGroup = this._nextJobsGroup();
          if (!nextGroup) break;
          const nextJob = this._nextJob();
          this._runJob(nextJob)
            .then(() => this._runningGroupJobs[group]--)
            .catch(console.error);
          this._runningGroupJobs[group]++;
        }
      } else {
        await new Promise(resolve => setTimeout(resolve, this._waitingTime));
      }
    }
    this._processingJobs = false;
    this._eventEmitter.emit(QUEUE_EMPTY_EVENT);
  }

  queueJob(fn, { priority = 50, group } = {}) {
    if (group)
      this._runningGroupJobs[group] = this._runningGroupJobs[group] || 0;
    this._jobs[priority] = this._jobs[priority] || [];
    const promise = new Promise((resolve, reject) =>
      this._jobs[priority].push({ fn, resolve, reject, group })
    );
    this._processJobs();
    return promise;
  }

  totalJobs() {
    const jobCount = this._jobs.reduce((sum, jobs) => sum + jobs.length, 0);
    return jobCount;
  }

  async _runJob(job) {
    try {
      job.resolve(await job.fn());
    } catch (error) {
      job.reject(error);
    }
  }

  _nextJob() {
    const nextPriority = Object.keys(this._jobs)
      .filter(priority => this._jobs[priority].length > 0)
      .sort((priorityA, priorityB) => priorityA - priorityB)[0];
    return this._jobs[nextPriority].shift();
  }

  _nextJobsGroup() {
    const nextPriority = Object.keys(this._jobs)
      .filter(priority => this._jobs[priority].length > 0)
      .sort((priorityA, priorityB) => priorityA - priorityB)[0];
    if (!nextPriority) return null;
    return this._jobs[nextPriority][0].group;
  }

  onQueueEmpty(callback) {
    this._eventEmitter.on(QUEUE_EMPTY_EVENT, callback);
  }
};
