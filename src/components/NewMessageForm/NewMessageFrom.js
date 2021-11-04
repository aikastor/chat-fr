import ChatMessage from "../ChatMessage/ChatMessage"

const NewMessageForm = ({
	newMessage,
	handleMessageChange,
	sendMessage,
	stopTypingMessage,
	startTypingMessage,
	handleChangeMessage
}) => {
	return (
		<form className="new-message-form">
			<input
				type="text"
				value={newMessage}
				onChange={handleChangeMessage}
				className="new-message-input-field"
				onKeyPress={startTypingMessage}
				onKeyUp={stopTypingMessage}
			/>
			<button
				type="submit"
				onClick={sendMessage}
				className="send-message-button"
			>
				Send
			</button>
		</form>
	)
}

export default NewMessageForm;