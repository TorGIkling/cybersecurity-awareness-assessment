import './newUser.css'
import {useLocation, useNavigate} from "react-router-dom";

function NewUser() {

    const navigate = useNavigate();
    const {organizationId} = useLocation().state as {organizationId: number};


    const handleBackClick = () => {
        navigate('/userList' , { state: { organizationId } });
    }

    const handleAddUserClick = async () => {

        let path = "/addUser";
        const emailInput = document.getElementById("email") as HTMLInputElement;
        const usernameInput = document.getElementById("username") as HTMLInputElement;
        const passwordInput = document.getElementById("password") as HTMLInputElement;
        const roleSelect = document.getElementById("userRole") as HTMLSelectElement;

        const emailValue = emailInput.value.trim();
        const usernameValue = usernameInput.value.trim();
        const passwordValue = passwordInput.value.trim();
        const roleValue = roleSelect.value.trim();


        //

        //Check if inputs are empty
        if (emailValue === "" || usernameValue === "" || passwordValue === "" || roleValue === "") {
            alert("Some fields are empty");
            return;
        }
        //Check if inputs are valid
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
        const isValidUsername = /^[a-zA-Z0-9æøåÆØÅ\s]+$/.test(usernameValue);
        if (!isValidEmail) {
            alert("Invalid email");
            return;
        }
        if (!isValidUsername) {
            alert("Invalid username");
            return;
        }

        const payload = {
            organizationId: organizationId,
            email: emailValue,
            username: usernameValue,
            password: passwordValue,
            role: roleValue
        }

        try {
            const response = await fetch(process.env.REACT_APP_REST_API_URL + path, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            })
            if (response.ok) {
                alert("User Added");
                emailInput.value = "";
                usernameInput.value = "";
                passwordInput.value = "";
                roleSelect.value = "";
            } else {
                alert("User could not be added");
            }
        } catch (error) {
            console.error("Error adding user:", error);
            alert("Error occurred during user creation.");
        }

    }

    return (
        <div className="new-user-page">
            <div className="new-user-container">
                <input id="email" className="new-user-input" type="email" placeholder="Email" />
                <input id="username" className="new-user-input" type="text" placeholder="Username" />
                <input id="password" className="new-user-input" type="password" placeholder="Password" />
                <select id="userRole" className="new-user-role">
                    <option value="" hidden selected disabled>Choose role</option>
                    <option value="Employee">Employee</option>
                    <option value="Evaluator">Evaluator</option>
                    <option value="Manager">Manager</option>
                    <option value="Admin">Admin</option>
                </select>
                <button className="add-user-btn" type="submit" onClick={handleAddUserClick}>Add User</button>
            </div>
            <button className="back-button" type="button" onClick={handleBackClick}>Back</button>
        </div>
    );
}
export default NewUser;