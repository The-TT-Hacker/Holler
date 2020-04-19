import { Class } from './class';

export interface Faculty {
  university: string;
  name: string;
  code: string;
  classes: Class[];
}