const Avatar = ({user}) => (
		<img src={user.img} class="rounded-circle" alt={user.name}></img>
)

export default Avatar;