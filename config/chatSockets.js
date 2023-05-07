// setting up socket on backend side because web socket has 2 way convo 

// as we know commountion always iniciate by client side always
module.exports.chatSockets=function(SocketServer){
    //receiveing connection requestion req.

    //io will handle the conection
    let io=require("socket.io")(SocketServer,{
        cors:{   // cross origin request (brower block request because for res sent from different url to differnt url)
            origin: "*",
        }
    })
    //this automatically emit that the connection is established and send or acknowledgement to frontend
    io.sockets.on("connection",function(socket){
        console.log("Chat connection is establishd ",socket.id);
        
        socket.on("join_room",function(data){
            // console.log("User joined",data);

            socket.join(data.chatroom);

            //send to all the users in the room
            io.in(data.chatroom).emit("user_joined",data);

            socket.on("disconnect",function(){
                console.log("Chat server has been disconnect")
            })
        })

        socket.on("send_message",function(data){
            // console.log("message details",data);

            //send to all the users in the room
            io.in(data.chatroom).emit("mess_received",data)
        })

        socket.on("exit_chatroom",function(data){
            console.log(`${data.user_Name} is disconnect from Codeial chatroom`)
            io.in(data.chatroom).emit("exit_chatroom",data)
        })
    })
    
}