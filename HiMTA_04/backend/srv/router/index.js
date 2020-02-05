"use strict";

module.exports = (app, server) => {
    app.use("/coffeemachine", require("./routes/coffeemachine")());
    app.use("/dest", require("./routes/dest")());
};
