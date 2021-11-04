import { useState } from "react";
import useChat from "../../Hooks/useChat";
import useTyping from "../../Hooks/useTyping";
import Avatar from "../Avatar/Avatar";
import ChatMessage from "../ChatMessage/ChatMessage";
import TypingMessage from "../TypingMessage.js/TypingMessage";
import Users from "../Users/Users";

const Chat = (props) => {
	
	const {roomId} = props.match.params;
	const {
		messages,
		users,
		user,
		typingUsers,
		sendMessage,
		stopTypingMessage,
		startTypingMessage
	} = useChat(roomId);

	const [newMessage, setNewMessage] = useState("");

	const {
		isTyping,
		stopTyping,
		startTyping,
		cancelTyping,
	} = useTyping()


	return(
		<div className="chat-room-container">
			<div className="chat-room-top-bar">
				<h1 className="room-name">Room: {roomId}</h1>
				{user && <Avatar user={user}></Avatar>}
			</div>
			<Users users={users}/>
			<div className="messages-container">
			<ol className="messages-list">
          		{messages.map((message, i) => (
					<li key={i}>
					<ChatMessage message={message}></ChatMessage>
					</li>
         		))}
				 {typingUsers.map((item, i) => (
					<li key={i}>
						<TypingMessage 
						user={item}/>
					</li>
				 ))}
		  	</ol>
			</div>
		</div>
	)
}

export default Chat;