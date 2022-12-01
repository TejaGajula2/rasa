import { useEffect, useState } from "react";
import axios from "axios";
import DashBoardTemplate from "../../components/Layout";
import Loader from "../../components/Loader";
import FriendUserCard from "../../components/FriendUserCard";
import { useUserState } from "../../context/userContext";

const LookFriends = () => {
  const [users, setUsers] = useState([]);
  const [loadUser, setLoadUser] = useState(false);
  const currentUser = useUserState()

  // get users
  useEffect(() => {
    setLoadUser(true);
    axios
      .get("friends/"+currentUser.id)
      .then((response) => {
        console.log(response.data)
        setLoadUser(false);
        setUsers(response.data);
      })
      .catch((err) => {
        setLoadUser(false);
        console.log(err);
      });
  }, []);

  return (
    <DashBoardTemplate>
      <div className="mx-auto  max-w-4xl h-full ">
        <div className="grid grid-cols-1 md:grid-cols-3  gap-5 py-4">
          {users.map((user) => (
            <FriendUserCard {...user} key={user.id} from_user={currentUser.id} />
          ))}
        </div>
      </div>
    </DashBoardTemplate>
  );
};

export default LookFriends;
