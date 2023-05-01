import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { authBackend } from "../../configs/axios";

const UserProfilePage = () => {

    const { id: userId } = useParams();
    const [user, setUser] = useState();

    const fetchUserDataFromAPI = async () => {
        authBackend.get('/')
    }

    useEffect(() => {
        // fetchUserDataFromAPI()
    }, [])

    return (
        <div>
            {userId}
        </div>
    )
}

export default UserProfilePage
