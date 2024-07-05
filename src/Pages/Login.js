import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from 'react-bootstrap/Alert';

function Login() {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [msg, setmsg] = useState(null)
    const navigate = useNavigate();

    const handlesubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("https://blogsphere-backend.vercel.app/user/login", { email, password });
            if (response) {
                localStorage.setItem("user", JSON.stringify(response.data.sendUser))
                navigate("/user_blogs")
            }
        } catch (error) {
            setmsg(error.response.data.msg)
            console.error(error);
        }
    }



    return <div>
        <Navbar />
        <section className="section-login">
            <div className="login">

                <h1 className="login_heading">Login.</h1>
                {msg ? (
                    <Alert className="alert" variant={"danger"} onClose={() =>{ 
                        setmsg(null)
                        setemail("")
                        setpassword("")
                        }} dismissible>
                        {msg}
                    </Alert>
                ) : ""}


                <form className="login_form" onSubmit={handlesubmit}>
                    <div className="login_form_input">
                        <label for="email">Email</label>
                        <input type="email"
                            value={email}
                            onChange={(event) => setemail(event.target.value)}
                            placeholder="Enter your email"
                            required />
                    </div>
                    <div className="login_form_input">
                        <label for="password">Password</label>
                        <input type="password"
                            value={password}
                            onChange={(event) => setpassword(event.target.value)}
                            placeholder="Enter your password"
                            required />
                    </div>

                    <button type="submit" className="login_form_button">Login</button>

                </form>

            </div>

        </section>



    </div>
}

export default Login;