"use strict";

const https = require("https");
const port = process.env.PORT || 3000;
const server = require("http").createServer();
const xsenv = require("@sap/xsenv");
const xssec = require("@sap/xssec");
const xsHDBConn = require("@sap/hdbext");
const express = require("express");
const logging = require("@sap/logging");
const compression = require("compression");
const cds = require("@sap/cds");
const bodyParser = require('body-parser');

if (process.argv[2] === "--debug") {
    global.DEBUG_MODE = true;
    //Load environment variables for CLOUD
    xsenv.loadEnv("debug-env.json");
}


https.globalAgent.options.ca = xsenv.loadCertificates();
global.__base = __dirname + "/";

// Initialize Express App
const app = express();

//Body parser
app.use(bodyParser.json());

//Compression
app.use(compression({
    threshold: "1b"
}));

//logging
const appContext = logging.createAppContext();
app.use(logging.middleware({
    appContext: appContext,
    logNetwork: true
}));


//HANA database
const hanaOptions = xsenv.getServices({
    hana: {
        plan: "hdi-shared"
    }
});
hanaOptions.hana.pooling = true;

app.use(
    xsHDBConn.middleware(hanaOptions.hana)
);

if (global.DEBUG_MODE) {
    hanaOptions.hana.ca = "-----BEGIN PUBLIC KEY-----MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAwThn6OO9kj0bchkOGkqYBnV1dQ3zU/xtj7Kj7nDd8nyRMcEWCtVzrzjzhiisRhlrzlRIEY82wRAZNGKMnw7cvCwNixcfcDJnjzgr2pJ+5/yDZUc0IXXyIWPZD+XdL+0EogC3d4+fqyvg/BF/F0t2hKHWr/UTXE6zrGhBKaL0d8rKfYd6olGWigFd+3+24CKI14zWVxUBtC+P9Fhngc9DRzkXqhxOK/EKn0HzSgotf5duq6Tmk9DCNM4sLW4+ERc6xzrgbeEexakabvax/Az9WZ4qhwgw+fwIhKIC7WLwCEJaRsW4m7NKkv+eJR2LKYesuQ9SVAJ3EXV86RwdnH4uAv7lQHsKURPVAQBlranSqyQu0EXs2N9OlWTxe+FyNkIvyZvoLrZl/CdlYc8AKxRm5rn2/88nkrYQ0XZSrnICM5FRWgVF2hn5KfZGwtBN85/D4Yck6B3ocMfyX7e4URUm9lRPQFUJGTXaZnEIge0R159HUwhTN1HvyXrs6uT1ZZmW+c3p47dw1+LmUf/hIf8zd+uvHQjIeHEJqxjqfyA8yqAFKRHKVFrwnwdMHIsRap2EKBhHMfeVf0P2th5C9MggYoGCvdIaIUgMBX3TtCdvGrcWML7hnyS2zkrlA8SoKJnRcRF2KxWKs355FhpHpzqyZflO5l98+O8wOsFjGpL9d0ECAwEAAQ==-----END PUBLIC KEY-----";
}




//CDS OData V4 Handler
cds.connect({
    kind: "hana",
    logLevel: "info",
    credentials: hanaOptions.hana
});
cds
    .serve("gen/csn.json", {
        crashOnError: false
    })
    .at("/odata/")
    .with(require("./router/odata.js"))
    .in(app)
    .catch(err => {
        // do not crash on error
    });

//Setup Routes
require("./router")(app, server);

//Error handling
app.use(function (err, req, res, next) {
        res.status(500).send({
            "msgId": "",
            "type": "Error",
            "msg": err.message
        });
});

//Start the Server
server.on("request", app);
server.listen(port, () => console.info(`HTTP Server: ${server.address().port}`));
