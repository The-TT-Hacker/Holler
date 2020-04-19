import { User } from "../models/user";
import { Request } from "express";

export interface HollerRequest extends Request {
  uid: string;
  user: User;
  query: {
    // Event search
    searchText: string;
    tags: string;
    startDate: string;
    endDate: string;
    // Pagination
    start: string;
    end: string;
    // Verify Email
    uid: string;
    oobCode: string;
  }
}