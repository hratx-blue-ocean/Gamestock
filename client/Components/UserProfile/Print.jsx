import React from "react";
import { StyledButton } from "../Core/coreStyles.jsx";

// TODO - print a csv of the user's collection

const Print = () => {
  return (
    <div>
      <StyledButton onClick={() => window.print()} type="button">
        Print Collection
      </StyledButton>
    </div>
  );
};

export default Print;
