import { EnumType } from "typescript";

interface IBooking {
    id: string;
    date: string;
    time: string;
    type : EnumType;
    cleaner:string;
    status: boolean;
  }
  

  export type {IBooking}
