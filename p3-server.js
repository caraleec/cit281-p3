const fs = require('fs');
// Require the Fastify framework and instantiate it
const fastify = require("fastify")();
const { coinCount, coins } = require("./p3-module.js");
// Handle GET verb for / route using Fastify
// Note use of "chain" dot notation syntax
//Home Route
fastify.get("/", (request, reply) => {
    let fileLocationOfHomePage = __dirname + "/index.html";
    fs.readFile(fileLocationOfHomePage, (err, data) => {
        if (err) {
            console.log("ERROR!");
         reply
            .code(500)
            .header("Content-Type", "text/html; charset=utf-8")
            .send("ERROR");
        } else {
            reply
            .code(200)
            .header("Content-Type", "text/html; charset=utf-8")
            .send(data);
        }
    })
});

// Coin Route
fastify.get("/coin", (request, reply) => {
        const {denom= 0, count = 0 } = request.query;
       // const coinage = denom && count ? [{denom, count}] : console.log("Error");
        // const coinValue = coinCount(coinage);
        console.log(denom, count);
        let coinValue = coinCount({denom: parseInt(denom), count: parseInt(count)});
            reply
            .code(200)
            .header("Content-Type", "text/html")
            .send(`<h2>Value of ${count} of ${denom} is ${coinValue}</h2><br /><a href="/">Home</a>`);
        }
    );

// Coins Route
fastify.get("/coins", (request, reply) => {
    let {option} = request.query;
    let coinValue = "";
   // const coinage = denom && count ? [{denom, count}] : console.log("Error");
    // const coinValue = coinCount(coinage);
    switch (option) {
        case "1": 
        coinValue = coinCount({ denom: 5, count: 3 }, { denom: 10, count: 2 });
        break;
        case "2": 
        coinValue = coinCount(...coins); 
        break;
    };
   
    reply 
        .code(200)
        .header("Content-Type", "text/html")
        .send(`<h2>Option ${option} value is ${coinValue}</h2><br /><a href="/">Home</a>`);
    }
);
// Start server and listen to requests using Fastify
const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
