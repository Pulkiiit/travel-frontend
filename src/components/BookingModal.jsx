import { useEffect, useState } from "react";
import axios from "axios";
/* eslint-disable react/prop-types */
const BookingModal = ({ closeModal, place, price }) => {
  const [bookings, setBookings] = useState(null);
  useEffect(() => {
    axios.get("/booking-list/" + place).then(res => setBookings(res.data));
  }, [place]);
  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex  justify-center items-center overflow-y-scroll'
      onClick={closeModal}
    >
      <div className='bg-white p-4 rounded '>
        <h2 className='text-2xl font-semibold bg-primary rounded-md p-2 text-white my-2 mx-5 text-center'>
          Bookings
        </h2>
        <ul>
          {bookings ? (
            bookings.map(booking => (
              <li
                key={booking._id}
                className='border-4 border-gray-700 p-4 rounded m-4'
              >
                <h1 className='text-lg'>{booking.client.name}</h1>
                <p className=''>
                  {`From : ${booking.from}`}
                  {`To : ${booking.to}`}
                  {booking.guests}
                  {price * booking.days}
                </p>
              </li>
            ))
          ) : (
            <div>No Bookings yet</div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default BookingModal;
