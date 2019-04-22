console.log('starting function');

const AWS = require("aws-sdk");
const {fetchBuildings} = require("./fetch");


const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-2'});

const {TABLE_NAME} = process.env;

exports.handle = function(e, ctx, cb) {
  console.log(`Fetching new data`);
  

  fetchBuildings().then(
    buildings => {

      console.log(`Found campuses ${Object.keys(buildings)}`);
      const params = {
        Item: {
          type: "buildings",
          content: buildings,
        },
    
        TableName: TABLE_NAME,
      };
    
      console.log(params);
    
      // write to database
      docClient.put(params, function(err, data) {
        console.log(err, data);
        cb(err, data);
      })


      
    }
  );

  /**
   * TODO: Error checking for consistency. We are hoping that cobalt stays consistent here.
   */

  // assert that we have only 3 campuses, unlikely to change anytime soon
  // if (Object.keys(buildings).length !== 3) {
  //   return cb("Returned object does not have 3 campuses");
  // } 

  // assert that all buildings have parameters that we need
  // for (let key in buildings) {
  //   const list = buildings[key];
  //   for (let building of list) {
  //     const {id, code, name, short_name, campus, lat, lng} = building;
  //     if (
  //       id === undefined ||
  //       code === undefined ||
  //       name === undefined ||
  //       short_name === undefined ||
  //       lat === undefined ||
  //       lng === undefined
  //     ) return cb(`Entry ${building} has undefined parameters`);
  //   }
  // }

  // buildings are well formed
  


}