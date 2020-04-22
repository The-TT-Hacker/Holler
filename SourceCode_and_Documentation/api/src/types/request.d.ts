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
    // Verify email
    uid: string;
    oobCode: string;
    // Get messages
    afterMessageId: string;
  }
}