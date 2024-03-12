export type HotelType = {
    name : string;
    city : string;
    country : string;
    description : string;
    type : string;
    pricePerNight : number;
    starRating : number;
    facilities : string[];
    imageFiles : FileList;
    adultCount : number;
    childCount : number;
};




function ManageHotelForm() {
  return (
    <form>ManageHotelForm</form>
  )
}

export default ManageHotelForm;