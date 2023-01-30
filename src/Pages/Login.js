import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import Logo from '../assets/uchat.png'
import { loginRoute } from '../Config/APIRoutes';
import { AuthContext } from '../Contexts/MainContext';

const Login = () => {
    const {currentuser} = useContext(AuthContext);
    const navigate = useNavigate()
    
    useEffect(() => {
        if (currentuser === null) {
          navigate('/login');
        }
      }, []);
    
    const [values, setValues] = useState({
        username: '',
        password: '',
    })
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            const { username, password } = values;
            const { data } = await axios.post(loginRoute, {
                username,
                password
            })
            if (data.status === false) {
                toast.error(data.msg, toastOptions);
            }
            if (data.status === true) {
                localStorage.setItem('uchat',
                    JSON.stringify(data.user));
                navigate("/");
            }
        }
    }
    

    const handleChange = event => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }
    const handleValidation = event => {
        const { username, password } = values;
        if (username === '') {
            toast.error(
                "Incorrect Username or Password.",
                toastOptions
            );
            return false;
        }
        else if (password.length < 8) {
            toast.error(
                "Incorrect Username or Password.",
                toastOptions
            );
            return false;
        }
        return true;
    }
    return (
        <>
            <FormContainer>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className="brand">
                        <img src={Logo} alt="logo" />
                        <h1>Uchat</h1>
                    </div>
                    <input type="text"
                        placeholder="Username"
                        name="username"
                        onChange={(e) => handleChange(e)}
                    />
                    <input type='password'
                        placeholder="Password"
                        name="password"
                        onChange={(e) => handleChange(e)}
                    />
                    <button type="submit">Login</button>
                    <span>
                        Don't have an account ? <Link to="/register">Register.</Link>
                    </span>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    );
};
const FormContainer = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: #db7093;
.brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  img {
    height: 3rem;
  }
  h1 {
    color: white;
  }
}
form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: #000;
  border-radius: 2rem;
  padding: 3rem 5rem;
}
input {
  background-color: transparent;
  padding: 1rem;
  border: 0.1rem solid #4e0eff;
  border-radius: 0.4rem;
  color: white;
  width: 100%;
  font-size: 1rem;
  &:focus {
    border: 0.1rem solid #997af0;
    outline: none;
  }
}
button {
  background-color: #4e0eff;
  color: white;
  padding: 1rem 2rem;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 0.4rem;
  font-size: 1rem;
  text-transform: uppercase;
  &:hover {
    background-color: #4e0eff;
  }
}
span {
  color: white;
  text-transform: uppercase;
  a {
    color: #4e0eff;
    text-decoration: none;
    font-weight: bold;
  }
}
`;
export default Login;