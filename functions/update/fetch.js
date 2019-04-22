/**
 * Function to fetch data from the cobalt API
 */

const axios = require("axios");

const {
  COBALT_GITHUB_ROOT,
  COBALT_BUILDINGS,
} = process.env;


const fetchBuildings = async () => {
  const url = `${COBALT_GITHUB_ROOT}${COBALT_BUILDINGS}`;

  console.log(`Sending request`);
  const buildings = await axios.get(url);

  return buildings.data
    .split("\n")
    .filter(str => str.trim().length > 0)
    .map(building => JSON.parse(building))
    .reduce(
      (collect, curr) => {
        const { id, code, name, short_name, campus, lat, lng, polygon, address } = curr;
        
        // Create new entry for the campus
        if (!(campus in collect)) collect[campus] = [];

        collect[campus].push(
          {
            id,
            code,
            name,
            // key value cannot be empty
            short_name: short_name === "" ? name : short_name,
            lat,
            lng
          });
        return collect;
      },
      {}
    );

}

module.exports = { fetchBuildings };