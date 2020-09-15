import React from "react";

const Print = () => {
  return (
    <div>
      <button onClick={() => window.print()} type="button">
        Print
      </button>
    </div>
  );
};

export default Print;
