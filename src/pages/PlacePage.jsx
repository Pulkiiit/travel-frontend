import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { placesActions } from "../store/index";
import BookingBox from "../components/BookingBox";
const PlacePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [showPhotos, setShowPhotos] = useState(false);
  const [bookingBox, setBookingBox] = useState(true);
  const place = useSelector(state => state.places.data);
  const maxGuests = place.maxGuests;
  const { _id } = useSelector(state => state.client.value);
  const [bookingData, setBookingData] = useState();
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/booking-check/${id}`).then(res => {
      dispatch(placesActions.setPlaces(res.data.place));
      if (res.data.flag === 1) {
        setBookingBox(false);
        setBookingData([res.data.from, res.data.to, res.data.days]);
      }
    });
  }, [id]);

  const perkIcon = perk => {
    switch (perk) {
      case "Wifi":
        return (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z'
            />
          </svg>
        );
      case "Parking":
        return (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12'
            />
          </svg>
        );
      case "Entrance":
        return (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75'
            />
          </svg>
        );
      case "Kitchen":
        return (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z'
            />
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z'
            />
          </svg>
        );
      case "TV":
        return (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z'
            />
          </svg>
        );
      case "Pet":
        return (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
            />
          </svg>
        );
      case "Backup":
        return (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
            />
          </svg>
        );
    }
  };

  if (showPhotos) {
    return (
      <div className='absolute bg-black text-white inset-0 min-h-screen'>
        <div className='bg-black p-8 grid gap-4'>
          <div>
            <h2 className='text-3xl mr-36'>Photos of {place.title}</h2>
            <button
              onClick={() => setShowPhotos(false)}
              className='fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow-black shadow bg-white text-black'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
              Close
            </button>
          </div>
          {place?.photos?.length > 0 &&
            place.photos.map(photo => (
              <div key={photo}>
                <img
                  loading='lazy'
                  src={`http://localhost:4000/uploads/${photo}`}
                />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className='mt-5 bg-gray-100 -mx-8 px-8 pt-8'>
        <h1 className='text-2xl'>{place.title}</h1>
        <a
          href={"https://maps.google.com/?q=" + place.address}
          target='_blank'
          rel='noreferrer noopener'
          className='flex gap-1 my-3 font-semibold underline'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z'
            />
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
            />
          </svg>

          {place.address}
        </a>
        <div className='relative'>
          <div className='grid gap-2 grid-cols-[2fr_1fr]  rounded-2xl overflow-hidden'>
            <div>
              {place.photos?.[0] && (
                <div>
                  <img
                    loading='lazy'
                    onClick={() => {
                      setShowPhotos(true);
                    }}
                    className='aspect-square object-cover cursor-pointer '
                    src={`http://localhost:4000/uploads/${place.photos[0]}`}
                  />
                </div>
              )}
            </div>
            <div className='grid'>
              {place.photos?.[1] && (
                <img
                  loading='lazy'
                  onClick={() => {
                    setShowPhotos(true);
                  }}
                  className='aspect-square object-cover cursor-pointer '
                  src={`http://localhost:4000/uploads/${place.photos[1]}`}
                />
              )}
              {place.photos?.[2] && (
                <div className='overflow-hidden'>
                  <img
                    loading='lazy'
                    onClick={() => {
                      setShowPhotos(true);
                    }}
                    className='aspect-square object-cover  cursor-pointer relative top-2'
                    src={`http://localhost:4000/uploads/${place.photos[2]}`}
                  />
                </div>
              )}
            </div>
          </div>
          <button
            onClick={() => setShowPhotos(true)}
            className='flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              className='w-5 h-5'
            >
              <path
                fillRule='evenodd'
                d='M1 5.25A2.25 2.25 0 013.25 3h13.5A2.25 2.25 0 0119 5.25v9.5A2.25 2.25 0 0116.75 17H3.25A2.25 2.25 0 011 14.75v-9.5zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 00.75-.75v-2.69l-2.22-2.219a.75.75 0 00-1.06 0l-1.91 1.909.47.47a.75.75 0 11-1.06 1.06L6.53 8.091a.75.75 0 00-1.06 0l-2.97 2.97zM12 7a1 1 0 11-2 0 1 1 0 012 0z'
                clipRule='evenodd'
              />
            </svg>
            Show photos
          </button>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-[2fr_1fr] mt-8 gap-8 max-h-screen mb-8'>
          <div>
            <div className='my-6 '>
              <h2 className='font-semibold text-2xl'>Description</h2>
              {place.description}
            </div>
            Check-in time: {place.checkIn} <br />
            Check-out time: {place.checkOut} <br />
            Max guests: {maxGuests}
          </div>
          <div>
            {bookingBox ? (
              <BookingBox place={place} id={_id} maxGuests={maxGuests} />
            ) : (
              <div className='my-6 mx-6'>
                <div className='font-semibold text-2xl my-3'>
                  Bookign Details
                </div>
                <p>From : {bookingData[0]}</p>
                <p>To : {bookingData[1]}</p>
                <p>Days : {bookingData[2]}</p>
                <p>
                  Cost : {bookingData[2] * place.price} ( &#8377; {place.price}{" "}
                  / per night)
                </p>
              </div>
            )}
          </div>
        </div>
        <div>
          <h2 className='font-semibold text-2xl'>Perks</h2>
          <div className='flex gap-4 mt-4 mb-4'>
            {place?.perks?.map(perk => (
              <div className='flex gap-2' key={perk}>
                <div>{perkIcon(perk)}</div>
                <div>{perk}</div>
              </div>
            ))}
          </div>
        </div>
        <div className='bg-white -mx-8 px-8 py-8 border-t'>
          <div>
            <h2 className='font-semibold text-2xl'>Extra Info</h2>
          </div>
          <div className='text-sm text-gray-700 leading-5 mt-2'>
            {place.extraInfo}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlacePage;
