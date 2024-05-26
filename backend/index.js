const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
require('./EmailScheduler');
require('./DeletingOldTasks')
app.use(cors());
const mongo = require("./db");
mongo();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-Width, Content-Type, Accept"
  );
  next();
});
app.use(express.json());
app.use('/api', require('./Routes/Authentication'))
app.use('/api', require('./Routes/Tasks'))
// app.use("/api", require("./Routes/ReturnInternship"));
// app.use("/api", require("./Routes/InternSigninSignup"));
// app.use("/api", require("./Routes/RecruiterSigninSignup"));
// app.use("/api", require("./Routes/PostInternship"));
// app.use("/api", require("./Routes/Quiz"));
// app.use("/api", require("./Routes/Leaderboard"));
// app.use('/api', require("./routes/DisplayItem"))
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
