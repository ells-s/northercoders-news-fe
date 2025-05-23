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
                setErrorMessage("An error occured when trying to log in. Please try again.")
            })
    }

    return (
        <>
            <form>
                <input
                    placeholder="Username"
                    id="usernameForm"
                    onChange={handleUsernameInputChange}
                ></input>
                <button onClick={setUsernameFromTextBox}>Sign In</button>
            </form>
            {errorMessage ? <p>{errorMessage}</p> : null}
        </>
    )

}

export default LoginPage