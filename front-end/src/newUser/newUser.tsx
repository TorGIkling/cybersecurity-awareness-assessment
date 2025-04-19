import './newUser.css'
import {useLocation, useNavigate} from "react-router-dom";
import bcrypt from "bcryptjs";

function NewUser() {

    const navigate = useNavigate();
    const {organizationId} = useLocation().state as {organizationId: number};
    const hashPassword = async (password: string) => {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    }

    const handleBackClick = () => {
        navigate('/userList' , { state: { organizationId } });
    }

    const handleAddUserClick = async () => {


        let path = "/addUser";
        const emailInput = document.querySelector(".new-user-input[type='email']") as HTMLInputElement;
        const usernameInput = document.querySelector(".new-user-input[type='text']") as HTMLInputElement;
        const passwordInput = document.querySelector(".new-user-input[type='password']") as HTMLInputElement;
        const roleSelect = document.querySelector(".new-user-role") as HTMLSelectElement;
        const emailValue = emailInput?.value.trim();
        const usernameValue = usernameInput?.value.trim();
        const passwordValue = passwordInput?.value.trim();
        const roleValue = roleSelect?.value;


        //

        //Check if inputs are empty
        if (emailValue === "" || usernameValue === "" || passwordValue === "" || roleValue === "") {
            alert("Alle felt må fylles ut");
            return;
        }
        //Check if inputs are valid
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
        const isValidUsername = /^[a-zA-Z0-9æøåÆØÅ\s]+$/.test(usernameValue);
        if (!isValidEmail) {
            alert("Ugyldig epost");
            return;
        }
        if (!isValidUsername) {
            alert("Ugyldig brukernavn");
            return;
        }

        //Hash password
        const hashedPassword = await hashPassword(passwordValue);

        const payload = {
            organizationId: organizationId,
            email: emailValue,
            username: usernameValue,
            password: hashedPassword,
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
                alert("Bruker lagt til");
                emailInput.value = "";
                usernameInput.value = "";
                passwordInput.value = "";
                roleSelect.value = "";
            } else {
                alert("Bruker kunne ikke legges til");
            }
        } catch (error) {
            console.error("Error adding user:", error);
            alert("Det oppstod en feil under oppretting av brukeren.");
        }

    }

    return (
        <div className="new-user-page">
            <div className="new-user-container">
                <input className="new-user-input" type="email" placeholder="Epost" />
                <input className="new-user-input" type="text" placeholder="Brukernavn" />
                <input className="new-user-input" type="password" placeholder="Password" />
                <select className="new-user-role">
                    <option value="" hidden selected disabled>Velg rolle</option>
                    <option value="Employee">Ansatt</option>
                    <option value="Evaluator">Evaluatør</option>
                    <option value="Manager">Leder</option>
                </select>
                <button className="add-user-btn" type="submit" onClick={handleAddUserClick}>Legg til bruker</button>
            </div>
            <button className="back-button" type="button" onClick={handleBackClick}>Tilbake</button>
        </div>
    );
}
export default NewUser;