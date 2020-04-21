import fetch from 'node-fetch';

// Import models
import { Coordinate } from "../models/coordinate";
import { GMapsResponse } from "../models/googleMaps";

// Import API key
const gmaps_api_key = require("../../secrets/gmaps_api_key.json");

/**
 * 
 * @param location String containing the location of an event, e.g. an address
 */
export async function getCoordinates(location: string): Promise<Coordinate> {
  
  try {

    const response: GMapsResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${gmaps_api_key}`).then(res => res.json());

    if (response.status !== "OK") throw "Couldn't get coordinates";
    
    const coordinate: Coordinate = {
      latitude: response.results[0].geometry.location.lat,
      longitude: response.results[0].geometry.location.lng
    }

    return coordinate;

  } catch (e) {
    throw e;
  }

}