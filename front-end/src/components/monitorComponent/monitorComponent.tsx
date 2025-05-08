import './monitorComponent.css'
import {useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "../AuthProvider";

interface User {
    userId: number;
    organizationId: number;
    email: string;
    username: string;
    password: string;
    hasAnswered: boolean;
    role: string;
    hasTempPassword: boolean;
}

function MonitorComponent() {
    const [user, setUser] = useState<User[]>([]);
    const organizationId = useContext(AuthContext)?.organizationId;
    const didFetchRef = useRef(false);



    useEffect(() => {
        if (!didFetchRef.current) {
            didFetchRef.current = true;
            loadUserList()
        }
    }, [organizationId]);

    const loadUserList = async () => {
        let path = "/users/" + organizationId;
        const response = await fetch(process.env.REACT_APP_REST_API_URL + path, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("authToken"),
            },
        });
        if (!response.ok) {
            console.error("Failed to fetch users");
            alert("Users could not be fetched");
            return;
        }

        const json = await response.json();
        console.log(json);
        setUser(json);
    }

    return (
        <div className='monitor-component'>
            {user.map((user) => (
                <div className='monitor-user-list-item' key={user.userId}>
                    <p className='monitor-user-list-text'>{user.username}</p>
                    <p className='monitor-user-list-text'>{user.email}</p>
                </div>
            ))}
        </div>
    );
}
export default MonitorComponent;