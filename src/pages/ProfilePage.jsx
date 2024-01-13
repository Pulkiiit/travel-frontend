import { useSelector, useDispatch } from "react-redux";
import { useNavigation, useNavigate } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import { clientActions } from "../store";
import axios from "axios";
const ProfilePage = () => {
  const client = useSelector(state => state.client.value);
  const navigate = useNavigate();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  if (!client && navigation.state === "submitting") {
    return navigate("/login");
  }
  const logoutHandler = async () => {
    await axios.post("/logout");
    dispatch(clientActions.setClient(null));
    navigate("/");
  };
  return (
    <>
      <AccountNav />
      <div className='text-center max-w-sm mx-auto'>
        Logged in as {client.name} {client.email} <br />
        <button
          onClick={logoutHandler}
          className='bg-primary rounded-full  py-1 text-white w-full mt-4'
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default ProfilePage;
