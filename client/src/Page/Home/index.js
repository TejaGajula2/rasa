import { useEffect, useState } from "react";
import axios from "axios";
import DashBoardTemplate from "../../components/Layout";
import PostCard from "../../components/PostCard";
import UserInfoCard from "../../components/UserInfoCard";
import { useUserState } from "../../context/userContext";
import Loader from "../../components/Loader";
import UserCard from "../../components/UserCard";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadPost, setLoadPost] = useState(false);
  const [loadUser, setLoadUser] = useState(false);
  const current_user = useUserState();

  // get posts
  useEffect(() => {
    setLoadPost(true);
    axios
      .get("post/")
      .then((res) => {
        setLoadPost(false);
        console.log(res.data);
        setPosts(res.data.results);
      })
      .catch((err) => {
        setLoadPost(false);
        console.log(err);
      });
  }, []);

  // get users
  useEffect(() => {
    setLoadUser(true);
    axios
      .get("users/")
      .then((data) => {
        setLoadUser(false);
        setUsers(data.data.results);
        console.log(data);
      })
      .catch((err) => {
        setLoadUser(false);
        console.log(err);
      });
  }, []);

  return (
    <DashBoardTemplate>
      <div className="mx-auto  max-w-4xl h-full ">
        <div className="  h-full grid grid-cols-12 gap-10">
          <div className=" overflow-y-auto col-span-12 md:col-span-8 w-full ">
            {!loadPost ? (
              posts.map((post) => (
                <PostCard
                  profileImage={post.user.image}
                  profileName={post.user.name}
                  postImage={post.image}
                  likeNumber={post.likes}
                  key={post.id}
                />
              ))
            ) : (
              <Loader />
            )}
          </div>
          <div className=" hidden md:inline col-span-4 space-y-4">
            <UserInfoCard key={current_user.id} {...current_user} />
            <h1  className='text-xl pr-red-cg mt-4'> Friends </h1>
            <div className='h-96  overflow-scroll space-y-4 p-2 '>
            {users.map((user) => (
              <UserCard {...user} />
            ))}
            </div>
          </div>
        </div>
      </div>
    </DashBoardTemplate>
  );
};

export default Home;
