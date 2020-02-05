/*eslint no-unused-vars: 0, no-shadow: 0, new-cap: 0*/
/*eslint-env node, es6 */
"use strict";

const express = require("express");

const dbClass = require(global.__base + "utils/dbClass");


function _prepareObject(oCoffeeMachine, req) {
		oCoffeeMachine.changedBy = "DebugCoffeeMachine";
    return oCoffeeMachine;
}


module.exports = () => {
    const app = express.Router();

    app.get("/", async (req, res, next) => {
        const logger = req.loggingContext.getLogger("/Application");
        logger.info('CoffeeMachine get request');
        let tracer = req.loggingContext.getTracer(__filename);
        tracer.entering("/coffeemachine", req, res);

        try {
            tracer.exiting("/coffeemachine", "CoffeeMachine Get works");
            res.type("application/json").status(201).send(JSON.stringify({text: "CoffeeMachine Get works"}));
        } catch (e) {
            tracer.catching("/coffeemachine", e);
            next(e);
        }
    });

    app.post("/", async (req, res, next) => {
        try {
            const db = new dbClass(req.db);

            const oCoffeeMachine = _prepareObject(req.body, req);
				    oCoffeeMachine.usid = await db.getNextval("cmid");

            const sSql = "INSERT INTO \"COFFEEMACHINE\" VALUES(?,?,?,?)";
						const aValues = [ oCoffeeMachine.cmid, oCoffeeMachine.date, oCoffeeMachine.numSimultCups, oCoffeeMachine.descr ];

						console.log(aValues);
						console.log(sSql);
            await db.executeUpdate(sSql, aValues);

            res.type("application/json").status(201).send(JSON.stringify(oCoffeeMachine));
        } catch (e) {
            next(e);
        }
    });

    app.put("/", async (req, res, next) => {
        try {
            const db = new dbClass(req.db);

            const oCoffeeMachine = _prepareObject(req.body, req);
            const sSql = "UPDATE \"COFFEEMACHINE\" SET \"DATE\" = ?, \"NUMSIMULTCUPS\" = ?, \"DESCR\" = ? WHERE \"CMID\" = ?";
						const aValues = [ oCoffeeMachine.cmid, oCoffeeMachine.date, oCoffeeMachine.numSimultCups, oCoffeeMachine.descr ];

            await db.executeUpdate(sSql, aValues);

            res.type("application/json").status(200).send(JSON.stringify(oCoffeeMachine));
        } catch (e) {
            next(e);
        }
    });

    return app;
};
