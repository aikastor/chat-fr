import {useState} from "react";
import {Link} from 'react-router-dom';

import "./Home.css";

const Home = () => {
	const [roomName, setRoomName] = useState("");

	const handleChange = (e) => {
		setRoomName(e.target.value);
	}
	return(
		<div className="home-container">
			<input 
				type="text" 
				className="text-input-field"
				value={roomName}
				onChange={handleChange}
			/>  
			<Link  className="enter-room-button" to={`/${roomName}`}> Join Room </Link>
  		</div>
	)
}


export default Home;