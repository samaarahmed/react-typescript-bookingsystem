enum BookingType{
  Hemstädning,
  Kontorstädning,
  Flytttädning,
  Fönsterputsning,
  Trappstädning
}

interface IBooking {
    id: string;
    date: string;
    time: string;
    type : BookingType,
    cleaner:string;
    status: boolean;
  }
  

  export type {IBooking,BookingType}
