import React from "react";
import styled from "styled-components";

export default function header() {
  const Logo = styled.img`
    height: 200px;
    weight: 550px;
  `;

  const LogoWrapper = styled.div`
    margin: -10px;
    margin-bottom: 30px;
    background-color: #22103e;
  `;

  return (
    <div>
      <LogoWrapper>
        <Logo src="https://i.imgur.com/XH8md3P.jpg" />
      </LogoWrapper>
    </div>
  );
}
