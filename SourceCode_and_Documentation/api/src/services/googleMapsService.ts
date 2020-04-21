import fetch from 'node-fetch';

// Import models
import { Coordinate } from "../models/coordinate";
import { GMapsResponse } from "../models/googleMaps";

// Import API key
const gmaps_api_key = require("../../secrets/gmaps_api_key.json");

const UNSW_COORDINATE: Coordinate = {
  latitude: -33.9165223,
  longitude:  151.2268465
};

/**
 * 
 * @param location String containing the location of an event, e.g. an address
 */
export async function getCoordinates(location: string): Promise<Coordinate> {
  
  try {

    const response: GMapsResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${gmaps_api_key}`).then(res => res.json());

    if (response.status !== "OK") throw "Couldn't get coordinates";

    // Find the result closest to UNSW
    var coordinate: Coordinate = {
      latitude: response.results[0].geometry.location.lat,
      longitude: response.results[0].geometry.location.lng
    };

    var distance = haversine(coordinate, UNSW_COORDINATE);

    for (var i = 1; i < response.results.length; i++) {

      const currentCoordinate: Coordinate = {
        latitude: response.results[i].geometry.location.lat,
        longitude: response.results[i].geometry.location.lng
      };

      var currentDistance = haversine(currentCoordinate, UNSW_COORDINATE);

      if (currentDistance < distance){
        coordinate = currentCoordinate;
        currentDistance = currentDistance;
      }

    }

    // Check if closest coordinate returned is close to UNSW
    if (distance > 100) throw "Best coordinate match is not within 100km of UNSW";

    return coordinate;

  } catch (e) {
    throw e;
  }

}

//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies in km
function haversine(coordinate1: Coordinate, coordinate2: Coordinate) {

  var R = 6371; // Radius of earth in km

  var dLat = degToRad(coordinate2.latitude - coordinate1.latitude);
  var dLon = degToRad(coordinate2.longitude - coordinate1.longitude);
  var lat1 = degToRad(coordinate1.latitude);
  var lat2 = degToRad(coordinate2.latitude);

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c;

  return d;

}

// Converts numeric degrees to radians
function degToRad(degrees: number) {
  return degrees * Math.PI / 180;
}