import { Link } from "react-router-dom";
import AccountNav from "./AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { placesActions } from "../store/index";
import BookingModal from "./BookingModal";
const AccomodationsPage = () => {
  const dispatch = useDispatch();
  const places = useSelector(state => state.places.data);
  const [price, setPrice] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [placeId, setPlaceId] = useState(null);
  useEffect(() => {
    const getPlaces = async () => {
      const { data } = await axios.get("/user-places");
      dispatch(placesActions.setPlaces(data));
    };
    getPlaces();
    setShowModal(false);
    return () => {
      dispatch(placesActions.removePlaces());
    };
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <AccountNav />

      <div className='text-center'>
        <Link
          className='bg-primary text-white px-4 py-2 rounded-full '
          to={"/account/accomodations/new"}
        >
          Add a new place
        </Link>
      </div>
      <div className='mt-4 flex'>
        {places &&
          places.length > 0 &&
          places.map(place => (
            <Link
              to={"/account/accomodations/" + place?._id}
              className='flex gap-4 mt-4 bg-gray-200 p-4 rounded-2xl cursor-pointer'
              key={place?._id}
            >
              <div className='flex w-32 h-32 bg-gray-300  grow shrink-0'>
                {place.photos && place.photos.length > 0 && (
                  <img
                    loading='lazy'
                    className='object-cover'
                    src={place.photos[0]}
                  />
                )}
              </div>
              <div className='shrink grow-0'>
                <h2 className='text-xl '>{place.title}</h2>
                <p className='text-sm mt-2'>{place.description}</p>
              </div>
              <button
                onClick={e => {
                  e.preventDefault();
                  setPlaceId(place?._id);
                  setPrice(place.price);
                  setShowModal(true);
                }}
                className=' rounded-2xl  bg-primary text-white h-10 px-2 py-2'
              >
                Bookings
              </button>
            </Link>
          ))}
      </div>
      {showModal && (
        <BookingModal closeModal={closeModal} place={placeId} price={price} />
      )}
    </div>
  );
};

export default AccomodationsPage;
