import './App.css';
import React, { useState, useRef, useEffect, useContext } from 'react'



function Admin() {
  



  const [file, setFile] = useState();

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
      setFile(e.target.files[0]);
  };

  const handleOnSubmit = (e) => {
      e.preventDefault();

      if (file) {
          fileReader.onload = function (event) {
              const csvOutput = event.target.result;
              // create an array with the csv data and store it in local storage
              const csvArray = csvOutput.split("\n");
              localStorage.setItem("suggestedPrompts", JSON.stringify(csvArray));

          };

          fileReader.readAsText(file);
      }
  };



  return (
    
    
<body>
<div >
        <h1  className="c-heading r-text"> <strong>Zuck's</strong> Inteligent Chat Bot</h1>
        <div>
        <div style={{ textAlign: "center" }}>
    
            <form>
                <input
                    type={"file"}
                    id={"csvFileInput"}
                    accept={".csv"}
                    onChange={handleOnChange}
                />

                <button
                    onClick={(e) => {
                        handleOnSubmit(e);
                    }}
                >
                    IMPORT CSV
                </button>
            </form>
        </div>
    </div>
        
    </div>
</body>
  );
}

export default Admin;
