import {useState} from "react";
import {Link} from 'react-router-dom';

const Home = () => {
	const [roomName, setRoomName] = useState("");

	const handleChange = (e) => {
		setRoomName(e.target.value);
	}
	return(
		<div>
				<div class="mb-3">
					<label className="form-label">Room name</label>
					<input 
						type="text" 
						className="form-control"
						value={roomName}
						onChange={handleChange}
						/>  
				</div>	
				<Link to={`/${roomName}`}> Join Room </Link>
  		</div>
	)
}


export default Home;