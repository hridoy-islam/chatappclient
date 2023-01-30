import React from 'react';
import styled from 'styled-components';
import { BiPowerOff } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { logoutRoute } from '../Config/APIRoutes';

const Logout = () => {
    const navigate = useNavigate();
    const handleClick = async()=> {
        const id = await JSON.parse(localStorage.getItem('uchat'))._id;
        const data = await axios.get(`${logoutRoute}/${id}`);
          if (data.status === 200) {
            localStorage.clear();
            navigate("/login");
        }
    }
    return (
        <Button onClick={handleClick}>
            <BiPowerOff />
        </Button>
    );
};

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #881337;;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;

export default Logout;