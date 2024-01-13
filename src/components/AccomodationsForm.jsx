import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { placeActions } from "../store/index";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import AccountNav from "./AccountNav";
const AccomodationsForm = () => {
  const place = useSelector(state => state.place);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    if (id === undefined) {
      return;
    }
    axios.get("/places/" + id).then(res => {
      console.log(res.data);
      const place = res.data;
      dispatch(placeActions.setTitle(place.title));
      dispatch(placeActions.setAddress(place.address));
      dispatch(placeActions.setAddedPhotos(place.photos));
      dispatch(placeActions.setDescription(place.description));
      dispatch(placeActions.setPerks(place.perks));
      dispatch(placeActions.setExtraInfo(place.extraInfo));
      dispatch(placeActions.setCheckIn(place.checkIn));
      dispatch(placeActions.setCheckOut(place.checkOut));
      dispatch(placeActions.setMaxGuests(place.maxGuests));
      dispatch(placeActions.setPrice(place.price));
    });
  }, [id, dispatch]);
  const addPhotoByLink = async e => {
    e.preventDefault();
    const { data: fileName } = await axios.post("/upload-link", {
      link: place.photoLink,
    });
    dispatch(placeActions.setAddedPhotos(fileName.name));
    dispatch(placeActions.setPhotoLink(""));
  };

  const uploadPhoto = e => {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/upload", data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then(res => {
        const { data: filename } = res;
        dispatch(placeActions.setAddedPhotos(filename));
      });
  };

  const submitHandler = async e => {
    e.preventDefault();
    if (id) {
      //update
      try {
        await axios.put("/place/" + id, place);
        navigate("/account/accomodations");
      } catch (e) {
        toast.error("Unexcpected Error. Please try agin later.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      try {
        await axios.post("/places", place);
        navigate("/account/accomodations");
      } catch (e) {
        toast.error("Unexcpected Error. Please try agin later.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };
  return (
    <>
      <AccountNav />
      <div>
        <form onSubmit={submitHandler}>
          <h2 className='text-2xl mt-3'>Title</h2>
          <input
            type='text'
            placeholder='title , for ex-> My Apartment'
            value={place.title}
            onChange={e => {
              dispatch(placeActions.setTitle(e.target.value));
            }}
          />
          <h2 className='text-2xl mt-3'>Address</h2>
          <input
            type='text'
            placeholder='address'
            value={place.address}
            onChange={e => {
              dispatch(placeActions.setAddress(e.target.value));
            }}
          />
          <h2 className='text-2xl mt-3'>Photos</h2>

          <div className='flex gap-1.5'>
            <input
              type='text'
              placeholder='Link for photo'
              value={place.photoLink}
              onChange={e => {
                dispatch(placeActions.setPhotoLink(e.target.value));
              }}
            />
            <button
              className='bg-gray-200 px-4 m-1.5 rounded-2xl'
              onClick={addPhotoByLink}
            >
              Add&nbsp;Photo
            </button>
          </div>

          <div className='grid gap-2 grid-cols-3 lg:grid-cols-6 md:grid-cols-4 mt-2'>
            {place.addedPhotos.length > 0 &&
              place.addedPhotos.map(link => (
                <div key={link} className='flex h-32'>
                  <img
                    className='rounded-2xl h-full w-full object-cover '
                    src={"http://localhost:4000/uploads/" + link}
                  />
                  <button
                    onClick={e => {
                      e.preventDefault();
                      dispatch(placeActions.removeAddedPhotos(link));
                    }}
                    className='absolute bg-transparent m-1'
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
                  </button>
                </div>
              ))}
            <label className='flex items-center justify-center gap-2 border rounded-2xl p-6 bg-transparent border-gray-300 text-2xl cursor-pointer'>
              <input
                type='file'
                className='hidden'
                accept='image/png,image/jpg,image/jpeg'
                onChange={uploadPhoto}
                multiple
              />
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
                  d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5'
                />
              </svg>
              Upload
            </label>
          </div>

          <div>
            <h2 className='text-2xl mt-3'>Description</h2>
            <textarea
              rows='4'
              cols='50'
              value={place.description}
              onChange={e => {
                dispatch(placeActions.setDescription(e.target.value));
              }}
            />
            <h2 className='text-2xl mt-3'>Perks</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mt-2'>
              <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer border-transparent'>
                <input
                  type='checkbox'
                  checked={place.perks.includes("Wifi")}
                  onChange={e => {
                    e.target.checked
                      ? dispatch(placeActions.setPerks("Wifi"))
                      : dispatch(placeActions.removePerks("Wifi"));
                  }}
                />
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

                <span>Wifi</span>
              </label>
              <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer border-transparent'>
                <input
                  type='checkbox'
                  checked={place.perks.includes("Parking")}
                  onChange={e => {
                    e.target.checked
                      ? dispatch(placeActions.setPerks("Parking"))
                      : dispatch(placeActions.removePerks("Parking"));
                  }}
                />
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

                <span>Free parking on premises</span>
              </label>
              <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer border-transparent'>
                <input
                  type='checkbox'
                  checked={place.perks.includes("Entrance")}
                  onChange={e => {
                    e.target.checked
                      ? dispatch(placeActions.setPerks("Entrance"))
                      : dispatch(placeActions.removePerks("Entrance"));
                  }}
                />
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

                <span>Private entrance</span>
              </label>
              <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer border-transparent'>
                <input
                  type='checkbox'
                  checked={place.perks.includes("Kitchen")}
                  onChange={e => {
                    e.target.checked
                      ? dispatch(placeActions.setPerks("Kitchen"))
                      : dispatch(placeActions.removePerks("Kitchen"));
                  }}
                />
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

                <span>Kitchen</span>
              </label>
              <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer border-transparent'>
                <input
                  type='checkbox'
                  checked={place.perks.includes("TV")}
                  onChange={e => {
                    e.target.checked
                      ? dispatch(placeActions.setPerks("TV"))
                      : dispatch(placeActions.removePerks("TV"));
                  }}
                />
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

                <span>TV</span>
              </label>
              <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer border-transparent'>
                <input
                  type='checkbox'
                  checked={place.perks.includes("Pet")}
                  onChange={e => {
                    e.target.checked
                      ? dispatch(placeActions.setPerks("Pet"))
                      : dispatch(placeActions.removePerks("Pet"));
                  }}
                />
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

                <span>Pets Allowed</span>
              </label>
              <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer border-transparent'>
                <input
                  type='checkbox'
                  checked={place.perks.includes("Backup")}
                  onChange={e => {
                    e.target.checked
                      ? dispatch(placeActions.setPerks("Backup"))
                      : dispatch(placeActions.removePerks("Backup"));
                  }}
                />
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

                <span>Power backup</span>
              </label>
            </div>
          </div>
          <h2 className='text-2xl mt-3'>Extra info</h2>
          <textarea
            rows='4'
            cols='50'
            value={place.extraInfo}
            onChange={e => {
              dispatch(placeActions.setExtraInfo(e.target.value));
            }}
          />
          <h2 className='text-2xl mt-3'>Check in and out time</h2>
          <div className='grid gap-2 sm:grid-cols-2 md:grid-cols-4 '>
            <div>
              <h3 className='mt-2 -mb-1'>Check in time</h3>
              <input
                type='text'
                placeholder='11:00'
                value={place.checkIn}
                onChange={e => {
                  dispatch(placeActions.setCheckIn(e.target.value));
                }}
              />
            </div>
            <div>
              <h3 className='mt-2 -mb-1'>Check out time</h3>
              <input
                type='text'
                placeholder='22:00'
                value={place.checkOut}
                onChange={e => {
                  dispatch(placeActions.setCheckOut(e.target.value));
                }}
              />
            </div>
            <div>
              <h3 className='mt-2 -mb-1'>Max no. of guests</h3>
              <input
                type='number'
                placeholder='3'
                value={place.maxGuests}
                onChange={e => {
                  dispatch(placeActions.setMaxGuests(e.target.value));
                }}
              />
            </div>
            <div>
              <h3 className='mt-2 -mb-1'>Price per night</h3>
              <input
                type='number'
                value={place.price}
                onChange={e => {
                  dispatch(placeActions.setPrice(e.target.value));
                }}
              />
            </div>
          </div>
          <button className='bg-primary w-full rounded-full px-2 py-2 text-white mt-4'>
            Save
          </button>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default AccomodationsForm;
