import * as dataService from "../services/dataService";

import interests from "../../data/interests.json";

interests.forEach((interest: string) => {
  dataService.setInterest(interest);
})