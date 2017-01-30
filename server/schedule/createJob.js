var cron = require('cron');

var createJob = (cronTime, task) => {
    return new cron.CronJob({
        cronTime: cronTime,
        onTick: task,
        start: false
    });
}

module.exports = createJob;