import { useEffect, useState } from "react"

const useTyping = () => {
	const [isTyping, setIsTyping] = useState(false);
	const [isKeyPressed, setIsKeyPressed] = useState(false);
	const [countdown, setCountDown]  = useState(5);

	const startTyping = () => {
		setIsKeyPressed(true);
		setCountDown(5);
		setIsTyping(true);
	}

	const stopTyping = () => {
		setIsKeyPressed(false);
	}

	const cancelTyping = () => {
		setCountDown(0);
	}

	useEffect(()=> {
		let interval;

		if(!isKeyPressed) {
			interval = setInterval(()=> {
				setCountDown((count) => count - 1 )
			}, 1000)
		} else if(isKeyPressed || countdown === 0) {
			clearInterval(interval)
		}

		if(countdown === 0) {
			setIsTyping(false);
		}

		return (()=> clearInterval(interval))
 	}, [isKeyPressed, countdown]);

	 return {
		 isTyping, 
		 stopTyping,
		 setIsTyping,
		 startTyping,
		 cancelTyping, 
	 }
}

export default useTyping;