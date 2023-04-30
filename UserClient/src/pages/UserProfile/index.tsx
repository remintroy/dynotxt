import { useParams } from "react-router-dom"

const UserProfilePage = () => {

    const { id: userId } = useParams();

    return (
        <div>
            {userId}
        </div>
    )
}

export default UserProfilePage
