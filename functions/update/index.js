console.log('starting function');

const {fetchBuildings} = require("./fetch");

exports.handle = function(e, ctx, cb) {
  console.log(`Fetching new data`);
  fetchBuildings().then(
    buildings => {
      cb(null, buildings);
    }
  )
}