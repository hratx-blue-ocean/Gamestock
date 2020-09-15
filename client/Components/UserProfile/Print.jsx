import React from "react";
import { Button } from "../Core/coreStyles.jsx";

const Print = () => {
  return (
    <div>
      <Button onClick={() => window.print()} type="button">
        Print Collection
      </Button>
    </div>
  );
};

export default Print;
