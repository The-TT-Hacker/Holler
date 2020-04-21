export interface GMapsResponse {
  "results": GMapsResponseResult[];
  "status": string;
}

export interface GMapsResponseResult {
  "address_components": GMapsAddressComponent[];
  "formatted_address": string;
  "geometry": GMapsGeometry;
  "place_id": string;
  "plus_code": any;
  "types": string[];
}

export interface GMapsAddressComponent {
  "long_name": string,
  "short_name": string,
  "types" : string[];
}

export interface GMapsGeometry {
  "location": GMapsCoordinate;
  "location_type": string;
  "viewport": any;
}

export interface GMapsCoordinate {
  "lat": number;
  "lng": number;
}