import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
const Welcome = () => {
    const [userName, setUserName] = useState("");
    useEffect(() => {
        setUserName( JSON.parse(localStorage.getItem('uchat')).username);
    }, []);
    return (
        <Container>
            <h1>
                Welcome, <span>{userName}!</span>
            </h1>
            <h3>Please select a chat to Start messaging.</h3>
        </Container>
    );
};


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;

export default Welcome;