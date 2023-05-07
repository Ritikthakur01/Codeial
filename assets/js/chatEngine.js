// setting up socket on frontend side because web socket has 2 way convo 

//this class is sent the request for connection

class ChatEngine{
    constructor(chat_box_id,userEmail,user_Name){
        this.chatBoxId=$(`#${chat_box_id}`);
        this.userEmail=userEmail;  
        this.user_Name=user_Name;
        this.socket=io.connect("http://localhost:5000")

        if(this.userEmail){
            this.connectionHandler()
        } 

    }
    connectionHandler(){
        let self=this;

        self.socket.on("connect",function(){
            console.log("Connection establised on frontend side..")
        })
        
        self.socket.emit("join_room",{
            user_email:self.userEmail,
            user_name:self.user_Name,
            chatroom:"Codeial"
        })
        self.socket.on("user_joined",function(data){
            console.log("User joined the room..",data)
        })

        $("#send-button").click(function(){
            let mess=$("#message").val();
            if(!mess==""){
                self.socket.emit("send_message",{
                    message:mess,
                    user_Name:self.user_Name,
                    user_email:self.userEmail,
                    chatroom:"Codeial"
                })
            }
        })

        self.socket.on("mess_received",function(data){
            let newMessage = $("<li>")

            let messType="other-message"

            if(self.userEmail==data.user_email){
                messType="self-message"
            }

            newMessage.append($("<span>",{
                'html':data.message,
            }))

            newMessage.append($("<h6>",{
                "html":data.user_Name
            }))

            $(`#${messType}`).prepend(newMessage)

            $("#message").val("");
        })

        $("#delete").click(function(){
            self.socket.emit("exit_chatroom",{
                user_Name:self.user_Name,
                user_email:self.userEmail,
                chatroom:"Codeial"
            })

            self.socket.on("exit_chatroom",function(data){
                self.chatBoxId.css("display","none")
                self.socket.disconnect()
            })
        })
    }
}