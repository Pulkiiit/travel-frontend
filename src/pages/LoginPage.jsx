/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from "react-router-dom";
import { userActions } from "../store/index";
import { clientActions } from "../store/index";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const LoginPage = () => {
  const email = useSelector(state => state.user.email);
  const password = useSelector(state => state.user.password);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (email !== "" && password !== "") {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [email, password]);

  const submitHandler = async () => {
    try {
      const { data } = await axios.post("/login", { email, password });
      dispatch(clientActions.setClient(data));
      dispatch(userActions.emailHandler(""));
      dispatch(userActions.passwordHandler(""));
      navigate("/");
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
          <h1 className='text-3xl text-center mb-4'>Login</h1>
          <form
            method='POST'
            className='max-w-md mx-auto'
            onSubmit={e => {
              e.preventDefault();
              submitHandler();
            }}
          >
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
            <button className='login' disabled={valid ? false : true}>
              Login
            </button>
            <div className='text-center py-2 text-gray-600'>
              Don't have an account yet?
              <Link className='underline text-black px-2' to={"/register"}>
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default LoginPage;
