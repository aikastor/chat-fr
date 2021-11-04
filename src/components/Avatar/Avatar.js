const Avatar = ({user}) => (
		<img src={user.img} className="rounded-circle" alt={user.name}></img>
)

export default Avatar;