/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
const BookingBox = ({ place, id, maxGuests }) => {
  const [disable, setdisable] = useState(true);
  const guests = useRef(null);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [days, setDays] = useState(0);
  const navigate = useNavigate();

  function loadScript(src) {
    return new Promise(resolve => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    try {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      // creating a new order

      const result = await axios.post("/payment", {
        price: place.price * days,
      });

      if (!result) {
        alert("Server error. Are you online?");
        return;
      }

      // Getting the order details back
      const { amount, id: order_id, currency } = result.data;

      const options = {
        key: "rzp_test_JsgTlQXD00kbtG", // Enter the Key ID generated from the Dashboard
        amount: amount.toString(),
        currency: currency,
        name: "Airbnb",
        description: "Test Transaction",
        //image: { logo },
        order_id: order_id,
        handler: async function (response) {
          const data = {
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          const result = await axios.post("/payment/success", data);

          alert(result.data.msg);
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        notes: {
          address: "",
        },
        theme: {
          color: "#61dafb",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      bookingHandler();
    } catch (error) {
      if (error.response) {
        // The request was made, but the server responded with a status code
        // outside the range of 2xx
        console.error("Server responded with an error:", error.response.data);
        console.error("Status code:", error.response.status);
        console.error("Headers:", error.response.headers);
      } else if (error.request) {
        // The request was made, but no response was received
        console.error("No response received from the server");
      } else {
        // Something happened in setting up the request that triggered the error
        console.error("Error setting up the request:", error.message);
      }
      console.error("Server responded with an error:", error.response.data);
    }
  }

  const calculateDays = () => {
    const start = new Date(from);
    const end = new Date(to);
    if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
      const timeDifference = Math.abs(end - start);
      const numberOfDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
      return numberOfDays;
    }
    return 0;
  };

  useEffect(() => {
    setDays(calculateDays());
  }, [from, to]);

  const bookingHandler = async () => {
    await axios.post("/booking-update", {
      place: place._id,
      client: id,
      guests: guests.current.value,
      days,
      from,
      to,
    });
    navigate("/account/bookings");
  };

  const guestHandler = () => {
    if (!guests.current.value) {
      setdisable(true);
      return;
    }

    if (guests.current.value > maxGuests) {
      setdisable(true);
    } else {
      setdisable(false);
    }
  };
  return (
    <>
      <div className='bg-white rounded-2xl p-4 shadow-md'>
        <div className='text-xl text-center'>
          Price: &#8377; {place.price} / per night
        </div>
        <div className='border rounded-2xl mt-4'>
          <div className='flex'>
            <div className='px-3 py-4 '>
              <label>Check in</label>
              <input
                type='date'
                value={from}
                onChange={e => setFrom(e.target.value)}
              />
            </div>
            <div className='px-3 py-4 border-l'>
              <label>Check out</label>
              <input
                type='date'
                value={to}
                onChange={e => setTo(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div className='px-3 py-4'>
              <label>No of guests</label>
              <input type='number' ref={guests} onChange={guestHandler} />
            </div>
          </div>
        </div>
        <button
          disabled={disable}
          onClick={displayRazorpay}
          className='bg-primary w-full rounded-full px-2 py-2 text-white mt-4 disabled:bg-gray-500'
        >
          Book this place
        </button>
      </div>
    </>
  );
};

export default BookingBox;
