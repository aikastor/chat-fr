const TypingMessage = ({user}) => {
	return (
		<div className="message-item">
			<div className="message-avatar-container">
				<img
					src={user.img}
					alt={user.name}
					className="message-avatar"
				/>
			</div>
		</div>
	)
}

export default TypingMessage;