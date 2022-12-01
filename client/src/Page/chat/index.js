import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const Chat = () => {
  useEffect(() => {
    var socket = io("http://localhost:8080", { transports: ["websocket"] });
    console.log("emmite");
    socket.emit("connect_room", {
      from_user: "616c43ea01ef28001ed91766",
      to_user: "616c47cc9c3ab10060b99d7b",
    });
    
    socket.on("new message", (data) => {
      console.log(data);
    });

    socket.emit('get_room_details',{
      users:["616c43ea01ef28001ed91766","616ceff4f4a3a2001e6f4812"]
    })
    socket.on('room_id',(data) =>{
      console.log(data)
      socket.emit('get_room_messages',{'id':data.id})
    })

    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
  }, []);

  return <div className="outerContainer">chat</div>;
};

export default Chat;
