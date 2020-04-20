import * as dataService from "../services/dataService";

const interests: string[] = require("../../data/interests.json");

interests.forEach(interest => {
  dataService.setInterest(interest);
})