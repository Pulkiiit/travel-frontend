/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from "react-router-dom";
import { userActions } from "../store/index";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const RegisterPage = () => {
  const name = useSelector(state => state.user.name);
  const email = useSelector(state => state.user.email);
  const password = useSelector(state => state.user.password);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [valid, setValid] = useState(false);
  useEffect(() => {
    if (name !== "" && email !== "" && errorMessage === "Password is strong!") {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [name, email, password, errorMessage]);

  useEffect(() => {
    var lowerCase = /[a-z]/g;
    var upperCase = /[A-Z]/g;
    var numbers = /[0-9]/g;
    if (password === "") {
      setErrorMessage(null);
    } else if (!password.match(lowerCase)) {
      setErrorMessage("Password should contains lowercase letters!");
    } else if (!password.match(upperCase)) {
      setErrorMessage("Password should contain uppercase letters!");
    } else if (!password.match(numbers)) {
      setErrorMessage("Password should contains numbers also!");
    } else if (password.length < 10) {
      setErrorMessage("Password length should be more than 10.");
    } else {
      setErrorMessage("Password is strong!");
    }
  }, [password]);

  const submitHandler = async () => {
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      toast.success("Registered Successfully!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/login");
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
  };

  return (
    <>
      <div className='mt-4 grow flex items-center justify-around'>
        <div className='mb-64'>
          <h1 className='text-3xl text-center mb-4'>Register</h1>
          <form
            className='max-w-md mx-auto text-align-center'
            onSubmit={e => {
              e.preventDefault();
              submitHandler();
            }}
          >
            <input
              type='text'
              name='name'
              placeholder='name'
              value={name}
              onChange={e => dispatch(userActions.nameHandler(e.target.value))}
            />
            <input
              type='email'
              name='email'
              placeholder='your@email.com'
              value={email}
              onChange={e => dispatch(userActions.emailHandler(e.target.value))}
            />
            <input
              type='password'
              name='password'
              placeholder='password'
              value={password}
              onChange={e =>
                dispatch(userActions.passwordHandler(e.target.value))
              }
            />
            <div
              className={
                errorMessage === "Password is strong!"
                  ? "text-green-500"
                  : "text-red-600"
              }
            >
              {errorMessage}
            </div>

            <button className='login' disabled={valid ? false : true}>
              Register
            </button>
            <div className='text-center py-2 text-gray-600'>
              Already a member?
              <Link className='underline text-black px-2' to={"/login"}>
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default RegisterPage;
