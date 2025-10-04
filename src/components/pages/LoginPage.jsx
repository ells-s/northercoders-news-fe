import { useState } from "react"
import { fetchUsers } from "../../api";
import { useNavigate } from "react-router-dom";


function LoginPage({ username, setUsername }) {
    const [usernameTextInput, setUsernameTextInput] = useState("");
    const [errorMessage, setErrorMessage] = useState("")
    let navigate = useNavigate();

    function handleUsernameInputChange(event) {
        setUsernameTextInput(event.target.value);
    }

    function setUsernameFromTextBox(event) {
        event.preventDefault();
        setErrorMessage("")
        fetchUsers()
            .then((res) => {
                let navUsername = ""
                res.forEach((user) => {
                    if (user.username === usernameTextInput) {
                        setUsername(usernameTextInput);
                        navUsername = user.username
                    }
                })
                return navUsername
            })
            .then((res) => {
                if (res) {
                    setErrorMessage("")
                    navigate(`../users/${res}`)
                }
                else {
                    setErrorMessage("Invalid username.")
                }
            })
            .catch((err) => {
                setErrorMessage("An error occurred when trying to log in. Please try again.")
            })
    }

    return (
        <div className="container login-page-container">
            <form className="form-container">
                <label htmlFor="usernameForm" className="form-label">
                    Type your username and click Sign In:
                </label>
                <input
                    placeholder="e.g. jessjelly"
                    id="usernameForm"
                    onChange={handleUsernameInputChange}
                    className="form-input"
                />
                <button onClick={setUsernameFromTextBox} className="button">Sign In</button>
            </form>
            {errorMessage && <p className="form-error-message">{errorMessage}</p>}
        </div>
    )

}

export default LoginPage