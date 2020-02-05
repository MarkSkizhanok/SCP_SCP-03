/*eslint no-unused-vars: 0, no-shadow: 0, new-cap: 0*/
/*eslint-env node, es6 */
"use strict";

const express = require("express");

const dbClass = require(global.__base + "utils/dbClass");


function _prepareObject(oBrand, req) {
		oBrand.changedBy = "DebugBrand";
    return oBrand;
}


module.exports = () => {
    const app = express.Router();

    app.get("/", async (req, res, next) => {
        const logger = req.loggingContext.getLogger("/Application");
        logger.info('Brand get request');
        let tracer = req.loggingContext.getTracer(__filename);
        tracer.entering("/brand", req, res);

        try {
            tracer.exiting("/brand", "Brand Get works");
            res.type("application/json").status(201).send(JSON.stringify({text: "Brand Get works"}));
        } catch (e) {
            tracer.catching("/brand", e);
            next(e);
        }
    });

    app.post("/", async (req, res, next) => {
        try {
            const db = new dbClass(req.db);

            const oBrand = _prepareObject(req.body, req);
				    oBrand.usid = await db.getNextval("cmid");

            const sSql = "INSERT INTO \"BRAND\" VALUES(?,?,?,?)";
						const aValues = [ oBrand.bid, oBrand.cmid, oBrand.name ];

						console.log(aValues);
						console.log(sSql);
            await db.executeUpdate(sSql, aValues);

            res.type("application/json").status(201).send(JSON.stringify(oBrand));
        } catch (e) {
            next(e);
        }
    });

    app.put("/", async (req, res, next) => {
        try {
            const db = new dbClass(req.db);

            const oBrand = _prepareObject(req.body, req);
            const sSql = "UPDATE \"BRAND\" SET \"CMID\" = ?, \"NAME\" = ? WHERE \"BID\" = ?";
						const aValues = [ oBrand.bid, oBrand.cmid, oBrand.name ];

            await db.executeUpdate(sSql, aValues);

            res.type("application/json").status(200).send(JSON.stringify(oBrand));
        } catch (e) {
            next(e);
        }
    });

    return app;
};
