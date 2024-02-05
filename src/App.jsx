import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./pages/Layout";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clientActions } from "./store";
import ProfilePage from "./pages/ProfilePage";
import AccomodationsPage from "./components/AccomodationsPage";
import AccomodationsForm from "./components/AccomodationsForm";
import Bookings from "./components/Bookings";
import PlacePage from "./pages/PlacePage";
// axios.defaults.baseURL = "https://airbnb-clone-backend-ysry.onrender.com";
axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route index element={<IndexPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/account' element={<ProfilePage />} />
      <Route path='/account/accomodations' element={<AccomodationsPage />} />
      <Route
        path='/account/accomodations/new'
        element={<AccomodationsForm />}
      />
      <Route
        path='/account/accomodations/:id'
        element={<AccomodationsForm />}
      />
      <Route path='/account/bookings' element={<Bookings />} />
      <Route path='/place/:id' element={<PlacePage />} />
    </Route>
  )
);

function App() {
  const client = useSelector(state => state.client.value);
  const dispatch = useDispatch();
  useEffect(() => {
    const getClient = async () => {
      if (!client?._id) {
        const { data } = await axios.get("/profile");
        dispatch(clientActions.setClient(data));
      }
    };
    getClient();
  }, [client, dispatch]);
  return <RouterProvider router={router} />;
}

export default App;
