import { useState } from "react"
import { fetchUsers } from "../../api";
import { useNavigate } from "react-router-dom";


function LoginPage({ username, setUsername }) {
    const [usernameTextInput, setUsernameTextInput] = useState("");
    let navigate = useNavigate();

    function handleUsernameInputChange(event) {
        setUsernameTextInput(event.target.value);
    }


    function setUsernameFromTextBox(event) {
        event.preventDefault();
        fetchUsers()
            .then((res) => {
                res.forEach((user) => {
                    if (user.username === usernameTextInput) {
                        setUsername(usernameTextInput);
                    }
                })
            })
            .then(() => {
                if (username) {
                    navigate(`../users/${username}`)
                }
            })
            .catch((err) => {
                console.log(err)
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
                {/* <p>{username ? `Welcome ${username}` : null}</p> */}
            </form>
        </>
    )

}

export default LoginPage