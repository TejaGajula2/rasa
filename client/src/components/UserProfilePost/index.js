import {ReactComponent as LikeSvg } from "../../Static/icons/like.svg"
import commentsImage from '../../Static/icons/comment.png'

const UserProfilePost = ({ image, like, comments }) => {
  return (
    <div className="shadow-lg  rounded-2xl  w-full hover:shadow-xl">
      
        <img
          alt="blog photo"
          src={image}
          className="max-h-96 w-full object-cover  rounded-3xl "
        />
        <div className=" flex gap-4 w-full p-4 items-center">
          <LikeSvg
            className="h-8 transition duration-500 ease-in-out transform hover:-translate-y-2 cursor-pointer"
            onClick={() => {
              console.log("liked");
            }}
          ></LikeSvg>
          <img
            src={commentsImage}
            className="h-9 transition duration-500 ease-in-out transform hover:-translate-y-2 cursor-pointer"
          ></img>
        </div>
   
    </div>
  );
};

export default UserProfilePost;