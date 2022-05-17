var  config = require('./dbconfig');
const  sql = require('mssql');

async  function  getLocations() {
    try {
      let  pool = await  sql.connect(config);
      let  locations = await  pool.request().query("SELECT * from user_checkin");
      return  locations.recordsets;
    }
    catch (error) {
      console.log(error);
    }
  }

  async  function  getLocation(locationId) {
    try {
      let  pool = await  sql.connect(config);
      let  location = await  pool.request()
      .input('input_parameter', sql.Int, locationId)
      .query("SELECT * from user_checkin where Id = @input_parameter");
      return  location.recordsets;
    }
    catch (error) {
      console.log(error);
    }
  }

  async  function  addLocation(location) {
    try {
      let  pool = await  sql.connect(config);
      let  insertLocation = await  pool.request()
      .input('id', sql.Int, location.id)
      .input('lat', sql.VarChar, location.lat)
      .input('lng', sql.VarChar, location.lng)
      .execute('InsertLocation');
      return  insertLocation.recordsets;
    }
    catch (err) {
      console.log(err);
    }
  }

  module.exports = {
    getLocations:  getLocations,
    getLocation:  getLocation,
    addLocation:  addLocation
  }