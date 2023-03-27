import logo from './logo.svg';
import './App.css';
import React, { useState, useRef, useEffect, useContext } from 'react'
import gmail from './assets/gmail.png'
import outlook from './assets/outlook.png'
import office from './assets/office.png'
import fb from './assets/fb.png'
import ig from './assets/ig.png'
import linkedin from './assets/linkedin.png'
import twitter from './assets/twiter.png'
import gbusiness from './assets/gbusiness.png'
import pintrest from './assets/pintrest.png'
import gdoc from './assets/doc.png'
import gform from './assets/form.png'
import loader from './assets/loader.gif'
import copy from "./assets/copy-icon.svg";

function App() {

  let [suggestedPrompts, setSuggestedPrompts] = useState([]);
  useEffect(() => {
    const prompts = localStorage.getItem("suggestedPrompts");
    if (prompts) {
      setSuggestedPrompts(JSON.parse(prompts));
    }
  }, []);



  const messagesEndRef = useRef();
  const inputRef = useRef();
  const [formValue, setFormValue] = useState('');
  let [lastPrompt, setLastPrompt] = useState('');

  let [chat, setChat] =useState("");

  let [isLoader, setisLoader] = useState(false);

  const [copied, setCopied] = useState(false);
  const [copiedText, setCopiedText] = useState("Copy to clipboard");
    const copyToClipboard = async (text) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopiedText(text);

        // if copy is successful, show a message to the user for 1 second
        setCopied(true);
        setTimeout(() => { 
          setCopied(false)
        }, 1000);

        
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    };
    let [one, setOne] = useState(true);
    function reRight(e){
     
      if(one){ lastPrompt = "rewrite for "+lastPrompt }
      else{ lastPrompt = "try again for "+lastPrompt}
      setOne(false)
      
      
      console.log(formValue)
      console.log(lastPrompt)
     
      sendMessage();

    }

    let [key, setKey] = useState(true);

  const sendMessage = async () => {
    // e.preventDefault();
    setisLoader(true)
    if(key === true){
    setLastPrompt(formValue);
    console.log("its if conditions")
    }
    setKey(false);
 
    let prpt = lastPrompt ? lastPrompt : formValue
   

    const BASE_URL = 'https://gpt3b.up.railway.app/'
    
        
    



    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      
      },
      body: JSON.stringify({
        prompt: prpt,
       
      }),
    });

    const data = await response.json();
    // setLimit(data.limit)

    if (response.ok) {
      
     setChat(data.bot)
      
    
    } else if (response.status === 429) {
     
    } else {
      // The request failed
      window.alert(`openAI is returning an error: ${response.status + response.statusText} 
      please try again later`);
      console.log(`Request failed with status code ${response.status}`);
      
    }
    setFormValue("");
    setisLoader(false)

    
  }
  let key2 = true;
  const sendMessageForSuggestedPrompts = async ( value) => {
    // e.preventDefault();
    setisLoader(true)
    if(key2 === true){
    setLastPrompt(value);

    }
    setKey(false);

    let sprompt = value;
 
    

    const BASE_URL = 'https://gpt3b.up.railway.app/'
    
        
    



    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      
      },
      body: JSON.stringify({
        prompt: sprompt,
       
      }),
    });

    const data = await response.json();
    // setLimit(data.limit)

    if (response.ok) {
      
     setChat(data.bot)
      
    
    } else if (response.status === 429) {
     
    } else {
      // The request failed
      window.alert(`openAI is returning an error: ${response.status + response.statusText} 
      please try again later`);
      console.log(`Request failed with status code ${response.status}`);
      
    }
    setFormValue("");
    setisLoader(false)

    
  }







  return (
    // <div classNameName="App">
    //   <header classNameName="App-header">
    //     <h1>
    //       <strong>Test</strong> App
    //     </h1>
    //   </header>
    //   <body>
    //     <div classNameName="left">
    //       <h2
    //         style={{
    //           margin: "40px",
    //           background: "white",
    //           width: "fit-content",
    //           borderRadius: "40px",
    //           paddingTop: "5px",
    //           paddingBottom: "5px",
    //           paddingLeft: "30px",
    //           paddingRight: "30px",
    //         }}
    //       >
    //         SUGGESTED PROMPTS
    //       </h2>
    //       <ul>
    //         <li>5 ideas for a real estate agent to henerate leads</li>
    //         <li>Write a 50 words letter for idea # "X"</li>
    //         <li>Write this paragraph in a funny fashion</li>
    //         <li>Build a triva about buying real estate</li>
    //         <li>Make this into a poem</li>
    //         <li>Create a stisfication survey</li>
    //         <li>Translate into Spanish</li>
    //       </ul>
    //     </div>
    //     <div classNameName="center">
    //       <textarea>
    //         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
    //       </textarea>
    //     </div>
    //     <div classNameName="right">
          
    //     </div>
    //   </body>
    // </div>
<body>
    <div className="main">

    <div className="p-left">
        <div className="l-first"><h2>Suggested Prompts</h2></div>
        {suggestedPrompts ? (
          suggestedPrompts.map((prompt) => (
            <div className="prompts"><a onClick={(e) => {
              sendMessageForSuggestedPrompts(prompt + " for " + lastPrompt);
            }}> <p >{prompt}</p></a></div>
          ))
        ) : (
          "")
            
          }
        
        <div className="prompts"><p><strong>MORE</strong></p></div>
    </div>

    <div className="p-center">
        <h1 className="c-heading"> <strong>Zuck's</strong> Inteligent Chat Bot</h1>
        <div className="screen"> {chat ? chat : ""} </div>
        {chat ? (
                      <img
                        style={{
                          cursor: "pointer",
                          width: "20px",
                          height: "20px",
                          float: "right",
                          marginRight: "20px",
                          marginTop: "8px",
                        }}
                        src={copy}
                        onClick={() => copyToClipboard(chat)}
                        alt="copy icon"
                      />
                      ) : ("")}
                      {
                      
                      
                      
                      
                      copied ? (
                        <span style={{ color: "black", float: "right", marginTop: "7px", marginRight: "17px"}}>
                          Copied.
                        </span>
                      ) : (
                        ""
                      )
            }
  {/* <input style={{ height: "75%",
  borderRadius: "8%",
  margin: "10px",
  backgroundColor: "white"}} type="textarea" name="textarea" id="textarea"></input> */}
  
         <form className="input-field">
         <spane onClick={reRight} style={{float : "right", marginRight: "30px", color : "white"}}>REWRITE LAST RESULTS</spane>
         <p style={{marginTop: "40px", marginLeft: "30px", color : "white"}}>Your Prompt</p>
         
         { isLoader ? 
         <div style={{    height: "50px",
    
         borderRadius: "20px",
         float: "right",
     
         
       borderRadius: "30px",
       backgroundColor: 'white',
       margin: "10px",
       marginTop: "10px",
       border: "none",
       width: '98%',
       padding: "5px 20px",
         
     }} >
         <img style={{height: "30px",
    
    borderRadius: "20px",
    float: "right",
    marginTop : "5px",
  width: "30px"}}  src={loader} alt="loader gif" /> </div>: (
    <>
   
          <input
            
            id="gpt"
            ref={inputRef}
            className="chatview__textarea-message"
            value={formValue}
            onChange={(e) => {
              setFormValue(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
         </> )}
          
          {/* { isLoader ? 
          <img src={loader} alt="loader gif" />
          : ""} */}
         
        </form>
        
    </div>

    <div  className="p-right">
        <div className="r-first"><h2>OUTCOME</h2></div>

        <div className="social-main">
          
            <div className="item">
                <div className="r-text">EMAIL</div>
                <div className="r-items">
                    <div > <a target="_blank" href="https://mail.google.com/"> <img src={gmail} className="mail" ></img> </a></div>
                    <div >  <a target="_blank" href="https://outlook.live.com/"> <img src={outlook} className="mail" ></img> </a> </div>
                    <div >  <a target="_blank" href="https://www.office.com/"> <img src={office} className="mail" ></img> </a> </div>
                </div>
            </div>
        
            <div className="item">
                <div className="r-text">SOCIAL MEDIA</div>
                <div className="r-items">
                    <div > <a target="_blank" href="https://www.facebook.com/"> <img src={fb} className="social" ></img> </a></div>
                    <div > <a target="_blank" href="https://www.instagram.com/"> <img src={ig} className="social" ></img> </a></div>
                    <div > <a target="_blank" href="https://twitter.com/"> <img src={twitter} className="social" ></img> </a></div>
                   
                </div>
                <div className="r-items">
                   
                    <div > <a target="_blank" href="https://business.google.com/"> <img src={gbusiness} className="social" ></img> </a></div>
                    <div > <a target="_blank" href="https://www.linkedin.com/"> <img src={linkedin} className="social" ></img> </a></div>
                    <div > <a target="_blank" href="https://www.pinterest.com/"> <img src={pintrest} className="social" ></img> </a></div>
                    
                </div>
            </div>
          
            <div className="item">
                <div className="r-text">PRODUCTIVITY</div>
                <div className="r-items">
                    
                    <div ><img src={gdoc} className="product" ></img></div>
                    <div ><img src={gform} className="product" ></img></div>
                
                </div>
            </div>
        </div>
    </div>
    
</div>
</body>
  );
}

export default App;
