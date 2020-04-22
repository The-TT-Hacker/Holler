import * as matchGenerator from "./matchGenerator";
import settings from "../../settings.json";

matchGenerator.generateMatches(settings.DAYS_BEFORE_EVENT_TO_START_MATCHING)
  .then(res => console.log(res))
  .catch(e => console.log(e));