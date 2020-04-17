import { User } from "../models/user";
import { Request } from "express";

export interface HollerRequest extends Request {
  uid: string;
  user: User;
  query: {
    searchText: string;
    tags: string;
    startDate: string;
    endDate: string;
  }
}