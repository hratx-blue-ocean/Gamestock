import React from "react";

//use window.print() method to open a print dialog 
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
