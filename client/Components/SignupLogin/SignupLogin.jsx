import React, { useState } from "react";
import axios from "axios";
import {
  StyledButton,
  Modal,
  ModalInner,
  Wrapper,
  Title,
  StyledForm,
  StyledInput,
  SplitFormItem,
} from "../Core/coreStyles.jsx";
import styled from "styled-components";
const ModalWrapper = styled(Wrapper)`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-item: center;
  padding: 20px;
  line-height: 1.2;
  flex-wrap: wrap;
`;
const SignupModalInner = styled(ModalInner)`
  width: 1200px;
  display: flex;
  flex-direction: column;
  justifiy-content: flex-start;
  padding: 20px;
  box-sizing: border-box;
`;
const SignupForm = styled(StyledForm)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-item: center;
  text-align: center;
`;
const LinkButton = styled(StyledButton)`
  background: #2d1c7b;
  color: #54f3f7;
  border: 0px solid #23143e;
  padding: 0px;
  box-shaddow: none;
  line-height: 224px;
  &:hover {
    background: none;
    color: #df77fd;
  }
`;

function SignupLogin(props) {
  const { setLoggedIn } = props;
  const [modalState, setModalState] = useState(false);

  const toggleModalState = () => {
    setModalState(!modalState);
  };

  const freeze = (modalState) => {
    const page = document.getElementsByTagName("body")[0];
    if (!modalState) {
      page.classList.add("freeze");
      toggleModalState();
    } else {
      page.classList.remove("freeze");
      toggleModalState();
    }
  };
  function alertMessage(nodeID) {
    let message = document.getElementById(nodeID);
    let placeHolder = document.getElementById("ErrorMessage");
    placeHolder.classList.add("hidden");
    message.classList.remove("hidden");
    let opacity = 1;
    let fade = setInterval(() => {
      opacity -= 0.1;
      if (opacity > 0) {
        message.style.opacity = opacity;
      } else {
        message.classList.add("hidden");
        placeHolder.classList.remove("hidden");
        message.style.opacity = 1;
        clearInterval(fade);
      }
    }, 300);
  }
  function signUp(e) {
    e.preventDefault();
    const pass1 = document.getElementById("signupPass1").value;
    const pass2 = document.getElementById("signupPass2").value;
    const username = document.getElementById("signupUsername").value;
    let body;
    if (username)
      body = {
        username,
        password: pass1,
      };
    if (pass1 === pass2) {
      console.log(pass1, pass2);
      if (body) {
        axios
          .post("/signup", body, {
            "Content-Type": "application/json",
          })
          .then((result) => {
            //probably push this state back to app.jsx
            console.log(result);
            if (typeof result.data === "string") {
              alertMessage("usernameTakenError");
            } else {
              let id = result.data.rows[0].id;
              let username = result.data.rows[0].username;
              setLoggedIn({
                loggedIn: true,
                userName: username,
                userId: id,
              });
            }
          })
          .catch((err) => {
            alertMessage("usernameTakenError");
            console.log(err);
          });
      }
    } else {
      alertMessage("passwordMatchError");
    }
    //   axios.post('/signup')
  }

  function logIn(e) {
    e.preventDefault();
    console.log("LoginFIred");
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPass").value;
    if (username && password) {
      let body = {
        username,
        password,
      };
      console.log("about to send request:", body);
      axios
        .post("/login", body, {
          "Content-Type": "application/json",
        })
        .then((result) => {
          if (typeof result.data === "string") {
            alertMessage("usernameOrPassError");
            console.log(result);
          } else {
            console.log(result);
            let id = result.data.id;
            let username = result.data.username;
            setLoggedIn({
              loggedIn: true,
              userName: username,
              userId: id,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          alertMessage("usernameOrPassError");
        });
    } else {
      console.log(username);
      console.log(password);
    }
  }

  return (
    <div>
      <Modal modalState={modalState} onClick={() => freeze(modalState)}>
        <SignupModalInner onClick={(e) => e.stopPropagation()}>
          <ModalWrapper>
            <SplitFormItem>
              <Title>Sign Up</Title>
              <SignupForm onSubmit={signUp} id="signupForm">
                <StyledInput
                  id="signupUsername"
                  name="username"
                  placeholder="Choose a username"
                  style={{
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                    textAlign: "center",
                  }}
                ></StyledInput>
                <p style={{ textAlign: "center" }}>Choose a Username</p>
                <StyledInput
                  id="signupPass1"
                  type="password"
                  placeholder="Choose a password"
                  style={{
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                    textAlign: "center",
                  }}
                ></StyledInput>
                <p style={{ textAlign: "center" }}>Choose a password</p>
                <StyledInput
                  id="signupPass2"
                  name="password"
                  type="password"
                  placeholder="Re-type your password"
                  style={{
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                    textAlign: "center",
                  }}
                ></StyledInput>
                <p style={{ textAlign: "center" }}>Re-Enter your password</p>
                <StyledButton type="submit">Submit</StyledButton>
              </SignupForm>
            </SplitFormItem>
            <div style={{ lineHeight: "300px" }}>OR</div>
            <SplitFormItem>
              <Title>Sign In</Title>
              <SignupForm onSubmit={logIn}>
                <StyledInput
                  id="loginUsername"
                  name="username"
                  placeholder="Login with your username"
                  style={{
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                    textAlign: "center",
                  }}
                ></StyledInput>
                <p style={{ textAlign: "center" }}>Username</p>
                <StyledInput
                  id="loginPass"
                  name="password"
                  type="password"
                  placeholder="Login with your password"
                  style={{
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                    textAlign: "center",
                  }}
                ></StyledInput>
                <p style={{ textAlign: "center" }}>Password</p>

                <StyledButton type="submit">Submit</StyledButton>
              </SignupForm>
            </SplitFormItem>
            <div style={{ flexBasis: "100%", height: "0" }} />
            <span id="ErrorMessage">&nbsp;</span>
            <span
              id="usernameOrPassError"
              className="hidden"
              style={{ color: "red" }}
            >
              incorrect username/password
            </span>
            <span
              id="passwordMatchError"
              className="hidden"
              style={{ color: "red" }}
            >
              Your passwords do not match
            </span>
            <span
              id="usernameTakenError"
              className="hidden"
              style={{ color: "red" }}
            >
              Username is taken
            </span>
          </ModalWrapper>
        </SignupModalInner>
      </Modal>
      <LinkButton onClick={() => freeze(modalState)}>Signup/Login</LinkButton>
    </div>
  );
}

export default SignupLogin;
