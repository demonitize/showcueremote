const config = require("./config.json");
const data = require("./data.json");
const osc = require("osc");
const express = require(`express`);
const app = express();
const balUtil = require('bal-util');
const pathUtil = require('path');
var outdated = false;
var curv = require("./package.json").version;
var newv = require("./package.json").version;


app.use(express.static("public"));
app.get("/", (request, response) => {
    if (!outdated) {
	    response.status(200).sendFile(__dirname + "/views/index.html");
    } else {
	    response.status(202).sendFile(__dirname + "/views/index.html");
    }
});


var SCSPort = new osc.UDPPort({
    localAddress: `${config.SCSip}`,
    localPort: "57121",
    metadata: true
});
SCSPort.open();



function runCommand(codename) {
    let cmd = data.commands[codename]
    console.log(`Sent ${cmd}`);
    SCSPort.send({
        address: cmd
    }, `${config.SCSip}`, `${config.SCSport}`);
}

app.get("/scs", async (request, response) => {
	let req = request.query

	switch (req.command) {
		case "null":
        default:
            console.log("Ignoring invalid command");
            runCommand(req.command);
			break;
		case "go":
            console.log(`Sending ${req.command} command`);
            runCommand(req.command);
			break;
		case "stopall":
            console.log(`Sending ${req.command} command`)
            runCommand(req.command);
			break;
        case "pauseresume":
            console.log(`Sending ${req.command} command`)
            runCommand(req.command);
            break;
        case "gotop":
            console.log(`Sending ${req.command} command`)
            runCommand(req.command);
            break;
        case "goback":
            console.log(`Sending ${req.command} command`)
            runCommand(req.command);
            break;
        case "gonext":
            console.log(`Sending ${req.command} command`)
            runCommand(req.command);
            break;
        case "goend":
            console.log(`Sending ${req.command} command`)
            runCommand(req.command);
            break;
	}
    await response.send({outdated: outdated, command: data.commands[req.command], newv, curv});
});

app.get("/etc", async (request, response) => {
	let req = request.query

})


const listener = app.listen("80", () => {
	console.log("Your app is listening on port " + listener.address().port);

    balUtil.packageCompare({
        local: pathUtil.join(__dirname, './', 'package.json'),
        remote: 'https://raw.githubusercontent.com/demonitize/showcueremote/main/package.json',
        newVersionCallback: function(details) {
            outdated = true;
            newv = details.remote.version
            return console.log("There is a new version of " + details.local.name + " available, you should probably upgrade...\nCurrent version:  " + details.local.version + "\nNew version:      " + details.remote.version + "\nGrab it here:     " + details.remote.homepage);
        },
        sameVersionCallback: function(details) {
            outdated = false;
            return console.log("You are up to date!")
        },
        oldVersionCallback: function(details) {
            outdated = false;
            return console.log("You are... somehow newer than the latest version... Maybe you should update the GitHub repo");
        },
        
      });
});
