const { getRoomByUsers, createRoom, getChatMessage } = require("./services/chatRoom.service");

module.exports = (io) => {
  io.sockets.on("connection", (socket) => {
  
    // get room details 
    socket.on("get_room_details", (user_data) =>{
      getRoomByUsers(user_data)
        .then((result) => {
          
          if (result === null || result.lenght===0 ) {
            createRoom(user_data).then((data) => 
            {
            socket.emit("room_id", data)})
          } else {
            room = result;
            socket.emit("room_id", result);
          }
        })
        .catch((err) => console.log(err));
    });
    

    // get room message details 
    socket.on('get_room_messages',(data) =>{
      getChatMessage(data)
      .then(data =>{
          console.log(data)
          socket.emit('chat_message',{"message":data})
      })
      .catch(msg =>{
        console.log(msg)
      })

    // create chat room message 
    socket.on('create_chat_message',(data)=>{

        
    })

    })
  
  
  
  
  
  });
};
