/*eslint no-unused-vars: 0, no-shadow: 0, new-cap: 0*/
/*eslint-env node, es6 */
"use strict";

const express = require("express");

const dbClass = require(global.__base + "utils/dbClass");


function _prepareObject(oAddress, req) {
		oAddress.changedBy = "DebugAddress";
    return oAddress;
}


module.exports = () => {
    const app = express.Router();

    app.get("/", async (req, res, next) => {
        const logger = req.loggingContext.getLogger("/Application");
        logger.info('Address get request');
        let tracer = req.loggingContext.getTracer(__filename);
        tracer.entering("/address", req, res);

        try {
            tracer.exiting("/address", "Address Get works");
            res.type("application/json").status(201).send(JSON.stringify({text: "Address Get works"}));
        } catch (e) {
            tracer.catching("/address", e);
            next(e);
        }
    });

    app.post("/", async (req, res, next) => {
        try {
            const db = new dbClass(req.db);

            const oAddress = _prepareObject(req.body, req);
				    oAddress.usid = await db.getNextval("adid");

            const sSql = "INSERT INTO \"ADDRESS\" VALUES(?,?,?,?)";
						const aValues = [ oAddress.adid, oAddress.bid, oAddress.city, oAddress.strt ];

						console.log(aValues);
						console.log(sSql);
            await db.executeUpdate(sSql, aValues);

            res.type("application/json").status(201).send(JSON.stringify(oAddress));
        } catch (e) {
            next(e);
        }
    });

    app.put("/", async (req, res, next) => {
        try {
            const db = new dbClass(req.db);

            const oAddress = _prepareObject(req.body, req);
            const sSql = "UPDATE \"ADDRESS\" SET \"BID\" = ?, \"CITY\" = ?, \"STRT\" = ? WHERE \"ADID\" = ?";
						const aValues = [ oAddress.adid, oAddress.bid, oAddress.city, oAddress.strt ];

            await db.executeUpdate(sSql, aValues);

            res.type("application/json").status(200).send(JSON.stringify(oAddress));
        } catch (e) {
            next(e);
        }
    });

    return app;
};
