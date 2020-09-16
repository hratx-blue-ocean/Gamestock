import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Modal,
  ModalInner,
  Wrapper,
  Title,
  Form,
  Input,
  SplitFormItem,
} from "../Core/coreStyles.jsx";
import styled from "styled-components";

function SignupLogin() {
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
  const ModalWrapper = styled(Wrapper)`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-item: center;
    padding: 20px;
  `;
  const SignupModalInner = styled(ModalInner)`
    width: 1200px;
  `;
  const SignupForm = styled(Form)`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-item: center;
    text-align: center;
  `;
  function alertMessage(nodeID) {
    let message = document.getElementById(nodeID);
    message.classList.remove("hidden");
    let opacity = 1;
    let fade = setInterval(() => {
      opacity -= 0.1;
      if (opacity > 0) {
        message.style.opacity = opacity;
      } else {
        message.classList.add("hidden");
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
      if (body) {
        axios
          .post("/signup", body, {
            "Content-Type": "application/json",
          })
          .then((result) => {
            //probably push this state back to app.jsx
            console.log(result);
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
          if (typeof result.data === "string")
            alertMessage("usernameOrPassError");
          console.log(result);
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
                <Input
                  id="signupUsername"
                  name="username"
                  placeholder="Choose a username"
                  style={{
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                    textAlign: "center",
                  }}
                ></Input>
                <span
                  id="usernameTakenError"
                  className="hidden"
                  style={{ color: "red" }}
                >
                  Username is taken
                </span>
                <p style={{ textAlign: "center" }}>Choose a Username</p>
                <Input
                  id="signupPass1"
                  type="password"
                  placeholder="Choose a password"
                  style={{
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                    textAlign: "center",
                  }}
                ></Input>
                <p style={{ textAlign: "center" }}>Choose a password</p>
                <Input
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
                ></Input>
                <span
                  id="passwordMatchError"
                  className="hidden"
                  style={{ color: "red" }}
                >
                  Your passwords do not match
                </span>
                <p style={{ textAlign: "center" }}>Re-Enter your password</p>
                <Button type="submit">Submit</Button>
              </SignupForm>
            </SplitFormItem>
            <div>OR</div>
            <SplitFormItem>
              <Title>Sign In</Title>
              <SignupForm onSubmit={logIn}>
                <Input
                  id="loginUsername"
                  name="username"
                  placeholder="Login with your username"
                  style={{
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                    textAlign: "center",
                  }}
                ></Input>
                <p style={{ textAlign: "center" }}>Username</p>
                <Input
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
                ></Input>
                <p style={{ textAlign: "center" }}>Password</p>
                <span
                  id="usernameOrPassError"
                  className="hidden"
                  style={{ color: "red" }}
                >
                  incorrect username/password
                </span>

                <Button type="submit">Submit</Button>
              </SignupForm>
            </SplitFormItem>
          </ModalWrapper>
        </SignupModalInner>
      </Modal>
      <Button onClick={() => freeze(modalState)}>Open Modal</Button>
    </div>
  );
}

export default SignupLogin;
