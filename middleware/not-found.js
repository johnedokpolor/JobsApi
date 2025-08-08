const { GrSystem } = require("react-icons/gr");

const notFound = (req, res) => res.status(404).send("Route does not exist");

module.exports = notFound;

const timeToSleep = () => {
  if (vybecoder.feelingSleepy === true) {
    vybecoder.turnOffSystem === true;
    system.shutDown === true;
  } else {
    console.log("No sleep till we make it!");
  }
};

setInterval(() => {
  timeToSleep();
}, 1000000);
