import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';

function Register() {
    const [email, setemail] = useState("")
    const [name, setname] = useState("")
    const [password, setpassword] = useState("")
    const [cpassword, setcpassword] = useState("")
    const [msg, setmsg] = useState("")
    const navigate = useNavigate();



    const handlesubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`https://blogsphere-backend-rt62.onrender.com/user/register`, {
                email, password, name, cpassword
            })
            if (response) {
                localStorage.setItem("user", JSON.stringify(response.data.sendUser))
                navigate("/user_blogs")
            }
        } catch (error) {
            setmsg(error.response.data.msg)
            console.error(error)
        }
    }



    return <div>
        <Navbar />

        <section className="section-register">
            <div className="register">

                <h1 className="register_heading">Register Here.</h1>
                {msg ? (
                    <Alert className="alert" variant={"danger"} onClose={() =>{ 
                        setmsg(null)
                        setemail("")
                        setpassword("")
                        setname("")
                        setcpassword("")
                        }} dismissible>
                        {msg}
                    </Alert>
                ) : ""}
                <form className="register_form" onSubmit={handlesubmit} >

                    <div className="register_form_input">
                        <label for="email">Email:</label>
                        <input type="email"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                            placeholder="Enter your email"
                            name="email"
                            required />
                    </div>

                    <div className="register_form_input">
                        <label for="name">Name:</label>
                        <input type="text"
                            value={name}
                            onChange={(e) => setname(e.target.value)}
                            placeholder="Enter your name"
                            name="name"
                            required />
                    </div>

                    <div className="register_form_input">
                        <label for="password">Password:</label>
                        <input type="password"
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                            placeholder="Enter your password"
                            name="password"
                            required />
                    </div>

                    <div className="register_form_input ">
                        <label for="confirm-password">Confirm Password:</label>
                        <input type="password"
                            value={cpassword}
                            onChange={(e) => setcpassword(e.target.value)}
                            placeholder="Confirm your password"
                            name="cpassword"
                            required />
                    </div>

                    <button type="submit" className="register_form_button">Register</button>



                </form>
                {/* <hr className="login_line"></hr>
                <h1 className="login_form_button_google_heading">OR</h1>
                <button type="submit" className="login_form_button_google">Register with google</button> */}

            </div>
        </section>


    </div>
}

export default Register;