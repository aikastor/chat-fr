import socketIOClient from "socket.io-client";

import { useEffect, useRef, useState } from "react";
import { events } from "../constants";
import axios from "axios";

const useChat = (roomId) => {
	const [messages, setMessages] = useState([]);
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState();
	const [typingUsers, setTypingUsers] = useState([]);
	const socketRef = useRef();

	useEffect(()=> {
		const getMessages = async() => {
			let response = await axios(`http://localhost:4000/rooms/${roomId}/messages`);
			response = response.data.messages;
			setMessages(response);
		}

		getMessages();
	}, [roomId]);

	useEffect(()=> {
		const getUser = async() => {
			let response = await axios(`https://api.randomuser.me/`);
			response = response.data.results[0];
			setUser({name: response.name.first, img: response.picture.thumbnail});
		}

		getUser();
	}, []);

	useEffect(()=> {
		const getUsers = async() => {
			let response = await axios(`http://localhost:4000/rooms/${roomId}/users`);
			response = response.data.users;
			setUsers(response);
		}	

		getUsers();

	}, [roomId])

	useEffect(()=> {

		if(!user) return;

		socketRef.current = socketIOClient("http://localhost:4000", {
			data: {
				roomId
			}
		});

		socketRef.current.on("connect", ()=> {
			console.log(`Connected to socket: ${socketRef.current.id}`)
		});

		socketRef.current.on(events.NEW_CHAT_MESSAGE_EVENT, (message)=> {
			const newMessage = {
				...message, 
				ownedByCurrentUser : message.senderId === socketRef.current.id
			};

			setMessages(messages => [...messages, newMessage]);
		});

		socketRef.current.on(events.USER_START_TYPING_MESSAGE_EVENT, (data)=> {
			if(data.senderId !== socketRef.current.id) {
				const user = data.user;
				setTypingUsers((users) => [...users, user]);
			}
		});

		socketRef.current.on(events.USER_STOP_TYPING_MESSAGE_EVENT, (data) => {
			if(data.senderId !== socketRef.current.id) {
				const user = data.user;
				setTypingUsers((users)=> users.filter((u)=> u.name !== user.name))
			}
		})

		return ()=> {
			socketRef.current.disconnect();
		}
	}, [roomId, user])

	const sendMessage = (message) => {
		if(!socketRef.current) return;
		socketRef.current.emit(events.NEW_CHAT_MESSAGE_EVENT, {
			body: message,
			senderId: socketRef.current.id,
			user
		})
	}
	const startTypingMessage = () => {
		if(!socketRef.current) return;
		socketRef.current.emit(events.USER_START_TYPING_MESSAGE_EVENT, {
			senderID: socketRef.current.id,
			user
		})
	}

	const stopTypingMessage = () => {
		if(!socketRef.current) return;
		socketRef.current.emit(events.USER_STOP_TYPING_MESSAGE_EVENT, {
			senderID: socketRef.current.id,
			user
		})
	}
	return {
		user,
		users,
		messages,
		typingUsers,
		sendMessage,
		startTypingMessage, 
		stopTypingMessage
	}
}

export default useChat;