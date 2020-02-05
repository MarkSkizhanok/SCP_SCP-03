/*eslint no-unused-vars: 0, no-shadow: 0, new-cap: 0*/
/*eslint-env node, es6 */
"use strict";

const express = require("express");

const dbClass = require(global.__base + "utils/dbClass");


function _prepareObject(oCoffee, req) {
		oCoffee.changedBy = "DebugCoffee";
    return oCoffee;
}


module.exports = () => {
    const app = express.Router();

    app.get("/", async (req, res, next) => {
        const logger = req.loggingContext.getLogger("/Application");
        logger.info('Coffee get request');
        let tracer = req.loggingContext.getTracer(__filename);
        tracer.entering("/coffee", req, res);

        try {
            tracer.exiting("/coffee", "Coffee Get works");
            res.type("application/json").status(201).send(JSON.stringify({text: "Coffee Get works"}));
        } catch (e) {
            tracer.catching("/coffee", e);
            next(e);
        }
    });

    app.post("/", async (req, res, next) => {
        try {
            const db = new dbClass(req.db);

            const oCoffee = _prepareObject(req.body, req);
				    oCoffee.usid = await db.getNextval("cid");

            const sSql = "INSERT INTO \"COFFEE\" VALUES(?,?,?,?,?)";
						const aValues = [ oCoffee.cid, oCoffee.cmid, oCoffee.name, oCoffee.producer, oCoffee.type ];

						console.log(aValues);
						console.log(sSql);
            await db.executeUpdate(sSql, aValues);

            res.type("application/json").status(201).send(JSON.stringify(oCoffee));
        } catch (e) {
            next(e);
        }
    });

    app.put("/", async (req, res, next) => {
        try {
            const db = new dbClass(req.db);

            const oCoffee = _prepareObject(req.body, req);
            const sSql = "UPDATE \"COFFEE\" SET \"CMID\" = ?, \"NAME\" = ?, \"PRODUCER\" = ?, \"TYPE\" = ? WHERE \"CID\" = ?";
						const aValues = [ oCoffee.cid, oCoffee.cmid, oCoffee.name, oCoffee.producer, oCoffee.type ];

            await db.executeUpdate(sSql, aValues);

            res.type("application/json").status(200).send(JSON.stringify(oCoffee));
        } catch (e) {
            next(e);
        }
    });

    return app;
};
