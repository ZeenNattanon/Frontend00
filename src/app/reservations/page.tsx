"use client"
import LocationDateReserve from "@/components/LocationDateReserve";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addReservation } from "@/redux/features/cartSlice";
import { ReservationItem } from "../../../interfaces";

export default function Reservations() {
  const urlParams = useSearchParams();
  const cid = urlParams.get('id');
  const model = urlParams.get('model');
  const dispatch = useDispatch<AppDispatch>()

  const makeReservation = () => {
    if (cid && model && pickUpDate && returnDate) {
      const item: ReservationItem = {
        carId: cid,
        carModel: model,
        numOfDays: returnDate.diff(pickUpDate, 'day'),
        pickupDate: dayjs(pickUpDate).format('YYYY/MM/DD'),
        pickupLocation: pickUpLocation,
        returnDate: dayjs(returnDate).format('YYYY/MM/DD'),
        returnLocation: returnLocation
      }
      dispatch(addReservation(item))
    }
  }

  const [pickUpDate, setPickUpDate] = useState<Dayjs|null>(null);
  const [pickUpLocation, setPickUpLocation] = useState<string>("BKK");
  const [returnDate, setReturnDate] = useState<Dayjs|null>(null);
  const [returnLocation, setReturnLocation] = useState<string>("BKK");

  return (
    <main className="w-[100%] flex flex-col items-center space-y-4">
      <div className="text-xl font-medium">New Reservation</div>
      <div className="text-xl font-medium">Car: {model}</div>

      <div className="w-fit space-y-2">
        <div className="text-medium text-left text-gray-600">Pick-Up Date and Location</div>
        <LocationDateReserve onDateChange={ (value:Dayjs)=>setPickUpDate(value) } onLocationChange={ (value:string)=>setPickUpLocation(value) }/>
        <div className="text-medium text-left text-gray-600">Return Date and Location</div>
        <LocationDateReserve onDateChange={ (value:Dayjs)=>setReturnDate(value) } onLocationChange={ (value:string)=>setReturnLocation(value) }/>
      </div>

      <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm" onClick={makeReservation}>
        Reserve this Car
      </button>
    </main>
  );
}