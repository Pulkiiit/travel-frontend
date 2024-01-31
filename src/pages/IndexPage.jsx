import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { placesActions } from "../store/index";
import axios from "axios";
const IndexPage = () => {
  const dispatch = useDispatch();
  const places = useSelector(state => state.places.data);
  useEffect(() => {
    axios.get("/places").then(res => {
      dispatch(placesActions.setPlaces(res.data));
    });
  }, []);
  return (
    <div className='grid gap-x-8 gap-y-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10 '>
      {places.length > 0 &&
        places.map(place => (
          <Link to={"/place/" + place?._id} key={place?._id}>
            <div className='bg-gray-500 mb-2 rounded-2xl flex'>
              {place?.photos?.[0] !== null && (
                <img
                  loading='lazy'
                  className='rounded-2xl aspect-square object-cover'
                  src={place?.photos?.[0]}
                />
              )}
            </div>
            <h2 className='font-bold'>{place?.address}</h2>
            <h3 className='text-sm text-gray-500'>{place?.title}</h3>
            <div className='mt-1'>
              <span className='font-bold'>&#8377;{place?.price} per night</span>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default IndexPage;
