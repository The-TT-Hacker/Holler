import * as db from "../common/database";

const uid: string = "8vhRFp1uo1Q7E6B0fFQ4a6ceyUa2";
const eventId: string = "2236046636703335";

db.addEventInterest(uid, eventId).then((res) => console.log(res));