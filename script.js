


// document.querySelector('[data-purpose="transcript-toggle"]').onclick   // transcript btn
console.log('Working');
var divElement = document.createElement("div");
divElement.innerHTML = `
    <div class="popup">
         <div class="popup-top">
           <h2>SpeedySynopsis</h2>
            <div class="action">
              <button class="popup-reload hide btn" title="reload">&#8634;</button>
              <button class="popup-copy hide btn" title="copy">&#128203;</button>
              <button class="popup-copied hide btn" title="copied">&#10003;</button>
              <button class="popup-close btn" title="close">&#10006;</button>
            </div>
         </div>
         <div class="popup-content">
           <div class="popup-error"></div>
            <div id="summary" class="summary">
            <p class="summary-paragraph center">

             Unlock curated Udemy summaries. Elevate your learning with concise insights. <br> <span style="display: block; text-align:center;"> Start exploring now.</span>
            </p>
            </div>
           <div class="popup-generate">
           <button class="popup-generate-btn">Generate Synopsis</button>
            </div>
          </div>
          <div class="popup-footer">
           <div>
              <a href="https://shishirchaurasiya.site/" class="shishir" alt="Shishir's Website link" target="_blank"> Developed by Shishir</a>
           </div>
            <div>
              <a href="mailto:shishirchaurasiya435@gmail.com" alt="contact me through mail" target="_blank">&#9993;</a>
            </div>
          </div>
    </div>
`;


document.body.appendChild(divElement);
var styleElement = document.createElement("style");
styleElement.innerHTML = `
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;600&display=swap');
      .popup {
          position: absolute;
          top: 10px;
          right: 20px;
          z-index: 200;
          text-align: center;
          width: 300px;
          border-radius: 10px;
          font-family: 'Rubik', sans-serif;
      }
      .popup > *{
        padding: 5px;
      }
      .popup-top,
      .popup-footer{
        display: flex;
        justify-content: space-between;
        align-items: center;
        // background-color: #b89404;
        background-color: #010101;
        padding: 2px 8px;
        
      }
      .popup-top{
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }
      .popup-top h2{
        font-weight: 600;
      }
      .popup-content::-webkit-scrollbar{
        width: 5px;
        height: 13px;

      }
      .popup-content{
        padding: 8px;
        max-height: 400px;
        overflow-y: scroll;
      }
      .summary-paragraph{
        text-align: left;
        margin: 20px 0;
        font-size: 13px;
      }
      .hide{
         display: none;
      }
      .btn{
        height: 30px;
        width: 30px;
        cursor: pointer;
        color: currentColor;
        background-color: transparent;
        border: none;
        outline: none;
        font-size: 15px;
      }
      .popup-generate-btn{
        cursor: pointer;
        margin: 20px;
        border-radius: 999px;
        padding: 5px 10px;
        border: 2px solid currentColor;
        color: currentColor;
        background-color: transparent;
        transition: transform 0.2s ease-in-out;
      }
      .popup-generate-btn:hover{
       transform: translateY(-3px);
       transform: scale(1.1);
      }

      .popup-reload{
        font-size: 20px;
      }
      .action{
        display: flex;
        align-items: center;
        transform: translateX(5px);
      }
      .action:not(:last-child){
        gap: 5px;
      }
      .popup-footer{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        padding: 4px 8px;
      }
      .popup-footer a, 
      .popup-footer a:visited{
        color: currentColor;
        text-decoration: none;
      }
      .popup-footer a:hover{
        color: gray;
      }
      .shishir{
        font-size: 13px;
      }
      .center{
        text-align: center;
      }
      .popup-bullet-point{
        transform: translateX(-8px);
      }
  `;
  
  function userPreference(){
    const popup=document.querySelector('.popup');
    const popupActionBtn=document.querySelector('.action');
    const generateDiv=document.querySelector('.popup-generate');

    if(window.matchMedia('(prefers-color-scheme: dark)').matches){
      popup.style.backgroundColor="#292929";
      popup.style.color="#fff";
      popupActionBtn.style.color="#fff";
      generateDiv.style.color="#fff";
    }else{
      popup.style.backgroundColor="#f2f2f2";
      popup.style.color="#212121";
      popupActionBtn.style.color="#212121";
      generateDiv.style.color="#212121";
    }
  }
  userPreference();

// Append the style element to the <head> of the document
document.head.appendChild(styleElement);

function closeButton() {
  let closeButton = document.querySelector('.popup-close');
  closeButton.addEventListener("click", function () {
    document.body.removeChild(divElement);
    // Send a message to background.js when the closeButton is clicked
    chrome.runtime.sendMessage({ action: 'closeButtonClicked' });
  });
}

closeButton();
const Coursera= 'https://www.coursera.org/learn/';
console.log(tab.url.startsWith(Coursera));

function getTheTranscript() {

  const summaryParagraph = document.querySelector('.summary-paragraph');


  let TranscriptNode = document.querySelectorAll('[class^="transcript--cue"]');
  if (TranscriptNode.length === 0) {
    const reloadBtn = document.querySelector('.popup-reload');
    reloadBtn.classList.remove('hide');
    reloadBtn.addEventListener('click', () => {
      document.location.reload();
    })
    summaryParagraph.textContent = `Kindly click the transcript button and give it another go.`;
    const generateBtn = document.querySelector('.popup-generate-btn');
    generateBtn.classList.add('hide');
    return undefined;
  }
  let TranscriptNodeLength = TranscriptNode.length;
  let transcript = '';
  for (let i = 0; i < TranscriptNodeLength; i++) {
    let currentSpan = TranscriptNode[i].querySelector('span').textContent;
    transcript = transcript + " " + currentSpan;
  }
  return transcript;
}

getTheTranscript();

function copyToClipboard() {
  const summaryParagraph = document.querySelector('.summary-paragraph');
  const copyBtn = document.querySelector('.popup-copy');
  const copiedBtn = document.querySelector('.popup-copied');
  copyBtn.classList.remove('hide');
  copyBtn.addEventListener('click', function () {

    const listItems = Array.from(summaryParagraph.querySelectorAll('li'));
    const copiedText = listItems.map(item => item.textContent).join('\n');

    // Copy the content to the clipboard
    navigator.clipboard.writeText(copiedText)
      .then(function () {
        // Toggle icons and revert after 3 seconds
        copyBtn.classList.add('hide');
        copiedBtn.classList.remove('hide');

        setTimeout(function () {
          copyBtn.classList.remove('hide');
          copiedBtn.classList.add('hide');
        }, 3000);
      })
      .catch(function (error) {
        const popupError = document.querySelector('.popup-error');
        popupError.textContent = `'Clipboard write failed:', ${error}`;
        console.error('Clipboard write failed:', error);
      });
  });

}

console.log(getTheTranscript());
if (getTheTranscript() !== undefined && getTheTranscript() !== '') {

  let PromptText = `I'm giving you the transcript of a video tutorial. Summaries it in bullet points. ${getTheTranscript()}`

  let API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNmM4YjU5ZTctZGJmNC00MWRmLWFmZjMtZDFjOWRhNDZmZmFiIiwidHlwZSI6ImZyb250X2FwaV90b2tlbiJ9.vSRlL0GbiKf2D0QVI_MPbfuNSwjPWbvEFlvcSvVgl9I"
  // let API_KEY="hfwdfhkqhfvqkhfvkqhv"
  let options = {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      output_sentences: 7,
      providers: "openai",
      text: PromptText,
      language: "en",
    }),
  };

  // let response = responseObject.openai.result;
  function convertToBulletPoints(response) {
    // Split the response into individual lines
    const lines = response.split('\n-');
    const filteredLines = lines.filter(item => item.length > 1 || item !== ":");
    // console.log(lines);
    const bulletPoints = filteredLines.map(line => {
      const firstColonIndex = line.indexOf(':');
      const lineWithoutFirstColon = firstColonIndex !== -1 ? line.slice(firstColonIndex + 1) : line;
      return `<li>${lineWithoutFirstColon.trim()}</li>`;
    });

    // Join the bullet points into a single string
    const bulletPointsString = `<ul class="popup-bullet-point">${bulletPoints.join('')}</ul>`;

    return bulletPointsString;
  }


  function appendBulletPoints(response) {
    const summaryParagraph = document.querySelector('.summary-paragraph');
    const bulletPoints = convertToBulletPoints(response);
    summaryParagraph.textContent = '';
    summaryParagraph.classList.remove('center');
    console.log('from promise', bulletPoints);
    //  console.log(summaryParagraph);

    summaryParagraph.innerHTML = bulletPoints;

  }

  const generateBtn = document.querySelector('.popup-generate-btn');
  generateBtn.addEventListener('click', function () {
     generateBtn.textContent="Generating Synopsis...";
    fetch("https://api.edenai.run/v2/text/summarize", options)
      .then((response) => {
        console.log("inside fetch");
        console.log(response);
        if (!response.ok) {
          throw new Error(`Oops! Something went wrong while fetching the summary. Please refresh the page and try again. Error Code: ${response.status} \n `);
        }
        return response.json();
      })
      .then((data) => {
        const res = data.openai.result;
        // const listItem = document.createElement("ul");
        console.log(res);
        const generateBtn = document.querySelector('.popup-generate-btn');
        appendBulletPoints(res);
        // generateBtn.addEventListener('click',function (){
        //   appendBulletPoints(res);
        // })
        generateBtn.classList.add('hide');
        copyToClipboard();
      })
      .catch((error) => {
        const summaryParagraph = document.querySelector('.summary-paragraph');
        summaryParagraph.textContent = `\n ${error}`
        console.error(error);
      });

  })
}





//   dark-color: #2e3059



// let responseObject = {
  //   "connexun": {
  //     "status": "success",
  //     "result": "And its value is only assigned when the function is actually called. But the this keyword again, depends on the way in which a function is called. And that's right, it should be Jonas, because that is the object that is calling the method down there in the last line. And now just for the sake of completion, there are actually other ways in which we can call a function, for example, using the new keyword or the call apply and bind methods, but we don't know yet what any of these are."
  //   },
  //   "openai": {
  //     "status": "success",
  //     "result": ":\n- The this keyword is a special variable created for every execution context and any function.\n- The value of the this keyword is not static and depends on how the function is called.\n- When a function is called as a method, the this keyword points to the object that is calling the method.\n- When a function is called as a normal function, the this keyword is undefined in strict mode and points to the global object in non-strict mode.\n- Arrow functions do not get their own this keyword and instead take the this keyword of the surrounding function.\n- When a function is called as an event listener, the this keyword points to the DOM element that the handler function is attached to.\n- The this keyword will never point to the function in which it is used or the variable environment of the function."
  //   },
  //   "microsoft": {
  //     "status": "success",
  //     "result": "Transcript is :  The this keyword, is an extremely important concept to understand in JavaScript. So, the this keyword or this variable is basically a special variable that is created for every execution context and therefore any function. And the first way to call a function is as a method. So when we call a method, the this keyword inside that method will simply point to the object on which the method is called, or in other words, it points to the object that is calling the method."
  //   },
  //   "emvista": {
  //     "status": "success",
  //     "result": "I 'm giving you the transcript of a video tutorial . Summaries it in bullet points . Transcript is :  The this keyword , is an concept to . And beginners , find it difficult . But do n't worry , It 's not works . The this keyword or this variable is a variable that is . We learned . Terms will take the value of the owner of the function , the this keyword is . We say . And that sounds abstract but we will . What 's important to understand is . It 's not the same . It depends called . And it s value is only assigned the function is called . It 's different from a value . Set X to five , X will be five . But the this keyword , depends on the way . But what does that mean ? Well , let 's analyze four ways . And the way to . As a function . We call a method , the this keyword inside that method will point to the object . Okay ? And let 's illustrate this with a example . The method is the calc Age method . In the line , we call the method and see inside the method , we used the this keyword . , what should be the value of the this keyword ? And that 's right . Is n't it ? And we can access all the . And . Year will become 1989 . Year . In this case , writing ' would have the effect as . But doing it is a way solution . And we will play example more in the video . But , another way we calling them as functions . Not as a method and not attached to any object . In this case will be undefined . That is only valid for mode . , this will point to the object . And that can be problematic and , this is another reason to . We have arrow functions and calling functions . It 's an important , arrow functions do not get their own . Use , it will be the this keyword of the surrounding function . Of the parent function and in terms , this is called the ' picked up from the outer scope of the arrow function . Forget this property of arrow functions . Believe . Okay ? It 's important not to ' Okay . And , called as an event listener , the this keyword will point to the DOM . Straightforward ? The this keyword is a source of confusion for beginners . But , it shall become simpler and to make it simpler . It 's important to know what the . This will point to the function . The this keyword will point to the environment of the function . And these are two misconceptions and so that 's I 'm . Okay ? , the rules that I know . And for the sake of completion , there are ways , but we do n't know . And I will talk works with them , the time comes . Anyway , that 's it for this lecture . Let 's use this to make it clear . "
  //   }
  // }
