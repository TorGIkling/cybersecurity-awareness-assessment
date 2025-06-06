import './userList.css'
import {useState, useEffect, useRef} from "react";
import {useLocation} from "react-router-dom";

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


function UserList() {
    const [user, setUser] = useState<User[]>([]);
    const {organizationId} = useLocation().state as {organizationId: number};
    const didFetchRef = useRef(false);

    useEffect(() => {
        if (!didFetchRef.current) {
            didFetchRef.current = true;
            loadUserList()
        }
    }, []);

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
      <div className="user-list">
          {user.map((user) => (
          <div className="user-list-item">
              <p className={"user-list-text"}>{user.email}</p>
              <p className={"user-list-text"}>{user.username}</p>
              <p className={"user-list-text"}>{user.role}</p>
          </div>
          ))}
      </div>
    );
}
export default UserList;