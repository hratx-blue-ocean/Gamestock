import React, { useState, useEffect } from 'react';
import { Button, Wrapper } from "./Core/coreStyles.jsx";
import styled from "styled-components";

export const BannerWrapper = styled(Wrapper)`
  margin-top: 10px;
  display: flex;
  background: #2d1c7b;
  color: #54f3f7;
  border-radius: 10px;
  border: 2px solid #eb29fd;
  flex-wrap: wrap;
  justify-content: space-between;
  align-item: center;
  box-sizing: border-box;
`;

const Avatar = styled.p`
  margin-left: 50px;
  margin: auto;
  padding: 20px 0px;
  &:hover {
    cursor: pointer;
  }
`;

const Header = ({loggedIn, setLogIn}) => { 
    return(
      <>
      {loggedIn ? <div>
      <BannerWrapper> 
      <Avatar>Avatar goes here</Avatar>
      <Text>Username</Text>
      <Text>Collection Value</Text>
      <Button>Login/Signup</Button>
      </BannerWrapper>
      </div> : 
      <div>
      <BannerWrapper> 
      <Avatar><img src='https://i.imgur.com/xlbOHDd.jpg'></img></Avatar>
      <Button>Login/Signup</Button></BannerWrapper>
      </div>}
      </>
        )
    };
    
    export default Header;
    
    
    
    
    //   const handleChange = (event) => {
    //     const { name, value } = event.target;
      
    //     setNewUserInfo({
    //       ...newUser,
    //       [name]: value
    //     });
    //   }

    // <div>
    //   <h3>Header</h3>
    //   <input type='text' name='username' onChange={e => handleChange(e)} placeholder='enter username'></input>
    //   <input type='password' name='password' onChange={e => handleChange(e)} placeholder='password'></input>
    //   <button onClick={createUser}>Submit</button>
    // </div>