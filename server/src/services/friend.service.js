const mongoose = require("mongoose");
const { friend, User } = require("../models");

const getFriends = (data) => {
  return User.find({ _id: { $nin: data } });
};

const createFriend = (data) => {
  return friend.create(data);
};

const test = () => {
  // return User.aggregate([
  //   { "$lookup": {
  //     "from": friend.collection.name,
  //     "let": { "friends": "$friends" },
  //     "pipeline": [
  //       { "$match": {
  //         "from_user": mongoose.Types.ObjectId("616c6d00d57e84001e79b7f8"),
  //         "$expr": { "$in": [ "$_id", "$$friends" ] }
  //       }},
  //       { "$project": { "status": 1 } }
  //     ],
  //     "as": "friends"
  //   }},
  //   { "$addFields": {
  //     "friendsStatus": {
  //       "$ifNull": [ { "$min": "$friends.status" }, 0 ]
  //     }
  //   }}
  // ])

  return User.aggregate([
    {
      $lookup: {
        from: friend.collection.name,
        localField: "friends",
        foreignField: "to_user",
        as: "test",
      },
    },
    {
      $unwind: {
        path: "$test",
        preserveNullAndEmptyArrays: true,
      },
    },
  ]);
};

test()
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
module.exports = {
  getFriends,
  createFriend,
};
