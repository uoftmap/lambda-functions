/**
 * Function to fetch data from the cobalt API
 */

const axios = require("axios");

const {
  COBALT_KEY, 
  COBALT_URL, 
  BUILDINGS_END, 
} = process.env;


const BUILDINGS_LIMIT = parseInt(process.env.BUILDINGS_LIMIT);
const BUILDINGS_STEP = parseInt(process.env.BUILDINGS_STEP);

const fetchBuildings = async () => {
  const url = `${COBALT_URL}${BUILDINGS_END}`;
  
  const fetches = [];
  
  for (let i = 0; i < BUILDINGS_LIMIT; i += BUILDINGS_STEP) {
    const fetch = axios.get(
      url, {
        params: {
          key: COBALT_KEY,
          limit: BUILDINGS_STEP,
          skip: i,
          sort: "+id",
        }
      }
    )
    
    console.log(`Sending request ${i}`);

    fetches.push(fetch);
  }

  const buildings = await Promise.all(fetches);
  return buildings.map(res => res.data).reduce(
    (collect, curr) => {
      console.log(`Got request size ${curr.length}`);
      return collect.concat(curr)
    },
    []
  );
}

module.exports = {fetchBuildings};