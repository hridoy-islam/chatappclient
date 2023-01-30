import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ChatContainer from '../Components/ChatContainer';
import Contacts from '../Components/Contacts';
import Welcome from '../Components/Welcome';
import { allUsersRoute } from '../Config/APIRoutes';

const Chat = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);

  useEffect(() => {
    if (!localStorage.getItem('uchat')) {
      navigate("/login");
    } 
    else {
      setCurrentUser( JSON.parse(localStorage.getItem('uchat')));
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      async function fetchContacts (){
        const {data} = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data);
      }
      fetchContacts ()
    }
    
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat)
  }

  return (
    <>
      <Container>
        <div className="container">
          <Contacts contacts={contacts} changeChat={handleChatChange}/>
          {currentChat === undefined ? <Welcome /> : <ChatContainer currentChat={currentChat} currentUser={currentUser} />}
        </div>
      </Container>
    </>
  );
};
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #db7093;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #fff1f2;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;