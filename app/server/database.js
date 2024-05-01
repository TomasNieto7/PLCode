const mongoose = require("mongoose");
const { MONGODB_URI } = require("./config");

mongoose.set('strictQuery', true);

mongoose
  .connect(MONGODB_URI)
  .then((db) => console.log("DB is connected"))
  .catch((err) => console.log(err));
