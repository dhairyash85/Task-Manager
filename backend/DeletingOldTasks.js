const cron = require('node-cron');
const Tasks = require('./Model/Tasks');
const connectToMongo = require('./db');

const deleteOldTasks = async () => {
    try {
        const now = new Date();
        const nowIST = new Date(now.getTime() + 5.5 * 60 * 60 * 1000); // Convert to IST
        const dateStr = nowIST.toISOString().split("T")[0];
        const timeStr = nowIST.toISOString().split("T")[1].slice(0, 5);

        const result = await Tasks.deleteMany({
            $or: [
                { date: { $lt: new Date(dateStr) } },
                { $and: [{ date: new Date(dateStr) }, { time: { $lt: timeStr } }] }
            ]
        });

        console.log(`${result.deletedCount} old tasks deleted.`);
    } catch (error) {
        console.error("Error deleting old tasks:", error);
    }
};

// Connect to MongoDB and then start the cron job
connectToMongo().then(() => {
    cron.schedule('* * * * *', () => { // Every hour
        console.log('Running delete old tasks job');
        deleteOldTasks();
    });
});
