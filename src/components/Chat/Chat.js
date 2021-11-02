import { useState } from "react";
import useChat from "../../Hooks/useChat";
import useTyping from "../../Hooks/useTyping";
import Avatar from "../Avatar/Avatar";

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
		<div className="">
			<h1>Room name: ${roomId}</h1>
			{/* todo: component for user avatar */}
			<p>{user.name}</p>
			<Avatar/>
			{/* todo: component for user avatar */}
			<div>
				{
					users.map(user => 
						<p>{user.name}</p>
					)
				}
			</div>
			
			{/* component with messages */}
			<div>
				<ul>
				{messages.map((message, i) => (
					<li key={i}><span>{message}</span></li>
				))}

				{
					typingUsers.map((user,i) => 
					<li key={i}><span>{user}</span></li>
					)	
				}	
				</ul>
			</div>
			<div>
				<form>
					<input type="text"/>
				</form>
			</div>
		</div>
	)
}