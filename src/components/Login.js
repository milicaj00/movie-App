import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const user = {
    email: "example@boopro.tech",
    password: "123123",
    accessToken: "b3-2t48rhbn"
};

const Login = props => {
    const pass = useRef();
    const mail = useRef();

    const [error, setError] = useState({ mail: true, pass: true });

    const navigate = useNavigate();

    const logovanje = async () => {
        if (mail.current.value == "" || pass.current.value == "") {
            alert("popunite sva polja");
            return;
        }

        const email = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$";

        if (!mail.current.value.match(email)) {
            alert("nevalidan mail");
            return;
        }

        if (mail.current.value == user.email) {
            if (pass.current.value == user.password) {
                alert("Success!");

                localStorage.setItem("access-token", user.accessToken);

                navigate("/movies");
            } else {
                setError(error => ({ ...error, pass: false }));
            }
        } else {
            setError(error => ({ ...error, mail: false }));
        }

        // await fetch
        //     ("http://dev.api.kabox.io/api/auth/login", {
        //         method : 'POST',
        //         body:{
        //             email:mail.current.value,
        //             password:pass.current.value
        //         }
        //     })
        //     .then(p => {
        //         if (p.status === 200) {
        //             console.log(p.data);
        //             alert("Success!")
        //             navigate('/movies')
        //         }
        //     })
        //     .catch(err => {
        //         if (err.response.status === 401)
        //         {
        //             setError((error) => ({...error, pass: false}))
        //         }
        //         else if (err.response.status === 422)
        //         {
        //             setError((error) => ({...error, mail: false}))
        //         } else {
        //             alert('Doslo je do greske')
        //         }
        //     });
    };

    return (
        <div className="mainDivLogin">
            <div className="divData">
                <label>e-mail:</label>
                <input placeholder="e-mail" ref={mail} />
                <label className="error" hidden={error.mail}>
                    this email does not exist
                </label>
            </div>
            <div className="divData">
                <label>password:</label>
                <input type="password" placeholder="password" ref={pass} />
                <label className="error" hidden={error.pass}>
                    wrong password
                </label>
            </div>
            <div className="divData">
                <button onClick={logovanje}>Log In</button>
            </div>
        </div>
    );
};
export default Login;
