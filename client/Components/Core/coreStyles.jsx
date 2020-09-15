import styled, { css } from "styled-components";
import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
  body {
    font-family: 'Press Start 2P', sans-serif;
    font-size: 12px;
    color: #54f3f7;
  }
`;

export const Modal = styled.div`
  opacity: ${({ modalState }) => (modalState ? 1 : 0)};
  pointer-events: ${({ modalState }) => (modalState ? "auto" : "none")};
  transition: ${({ modalState }) =>
    modalState ? "opacity 0.4s ease-in-out" : "none"};
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.65);
  disply: flex;
`;

export const ModalInner = styled.div`
  width: 600px;
  opacity: 1;
  margin: auto;
  margin-top: 30%;
`;

export const Freeze = styled.body`
  width: ${({ modalState }) => (modalState ? "100%" : "auto")};
  position: ${({ modalState }) => (modalState ? "fixed" : "auto")};
  max-height: ${({ modalState }) => (modalState ? "100%" : "auto")};
  overflow: ${({ modalState }) => (modalState ? "hidden" : "auto")};
`;

export const Wrapper = styled.div`
  margin: 0px auto;
  margin-top: 20px;
  padding: 10px;
  background: #1e1e1e;
  border-radius: 10px;
  border: 2px solid #54f3f7;
  box-sizing: border-box;
  max-width: 1200px;
`;

export const Button = styled.button`
  font-family: "Press Start 2P", sans-serif;
  font-size: 10px;
  background: #54f3f7;
  &:hover {
    background: skyblue;
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
  color: #2d1c7b;
  padding: 5px 10px;
  border: 2px solid #2d1c7b;
  border-radius: 10px;
  margin-right: 50px;
  margin: auto;
`;

export const NegativeButton = styled.button`
  font-family: "Press Start 2P", sans-serif;
  font-size: 10px;
  background: #2d1c7b;
  &:hover {
    background: #5a2dad;
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
  color: #54f3f7;
  padding: 5px 10px;
  border: 2px solid #2d1c7b;
  border-radius: 10px;
  margin-right: 50px;
  margin: auto;
`;

export const Input = styled.input`
  min-width: 300px;
  padding: 3px 10px;
  color: #2d1c7b;
  background-color: lightgray;
  border-color: #2d1c7b;
  border-radius: 10px;
  margin-right: 10px;
  &:focus {
    outline: none;
    border-color: #eb29fd;
  }
`;

export const Title = styled.h2`
  display: flex;
  justify-content: center;
  align-item: center;
`;

export const WrapGrid = styled.div`
  display: grid;
  grid-template-columns: 100px 100px 100px 100px 100px auto 100px 100px 100px 100px 100px;
`;

export const Form = styled.form``;
