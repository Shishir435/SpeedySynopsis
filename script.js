
// document.querySelector('[data-purpose="transcript-toggle"]').onclick   // transcript btn
console.log('SpeedySynopsis is working');
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

             Unlock curated summaries of Udemy and Coursera Video Tutorials. Elevate your learning with concise insights. <br> <span style="display: block; text-align:center;"> Start exploring now.</span>
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
        font-weight: 400;
        font-size: 16px;
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

function userPreference() {
  const popup = document.querySelector('.popup');
  const popupActionBtn = document.querySelector('.action');
  const generateDiv = document.querySelector('.popup-generate');

  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    popup.style.backgroundColor = "#292929";
    popup.style.color = "#fff";
    popupActionBtn.style.color = "#fff";
    generateDiv.style.color = "#fff";
  } else {
    popup.style.backgroundColor = "#f2f2f2";
    popup.style.color = "#212121";
    popupActionBtn.style.color = "#212121";
    generateDiv.style.color = "#212121";
  }
}
userPreference();

document.head.appendChild(styleElement);

function closeButton() {
  let closeButton = document.querySelector('.popup-close');
  closeButton.addEventListener("click", function () {
    document.body.removeChild(divElement);
    chrome.runtime.sendMessage({ action: 'closeButtonClicked' });
  });
}

closeButton();

function getTheTranscript() {
  const Udemy = 'https://www.udemy.com/course/';
  const Coursera = 'https://www.coursera.org/learn/'
  let currentTabUrl = window.location.href;
  // console.log(window.location.href);
  const summaryParagraph = document.querySelector('.summary-paragraph');
  if (currentTabUrl.startsWith(Udemy)) {
    let TranscriptPanel = document.querySelector('[class^="transcript--transcript-panel"]');
    let TranscriptNode= document.querySelectorAll('[class^="transcript--cue"]');
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
    let transcript = TranscriptPanel.innerText.replace(/\n/g, '');
    return transcript;
  } else if (currentTabUrl.startsWith(Coursera)) {
    let TranscriptNode = document.querySelectorAll('.phrases');
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
      let currentSpan = TranscriptNode[i].outerText;
      transcript = transcript + " " + currentSpan;
    }
    return transcript;
  }

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
    navigator.clipboard.writeText(copiedText)
      .then(function () {
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

  function convertToBulletPoints(response) {
    const lines = response.split('\n-');
    const filteredLines = lines.filter(item => item.length > 1 || item !== ":");
    const bulletPoints = filteredLines.map(line => {
      const firstColonIndex = line.indexOf(':');
      const lineWithoutFirstColon = firstColonIndex !== -1 ? line.slice(firstColonIndex + 1) : line;
      return `<li>${lineWithoutFirstColon.trim()}</li>`;
    });
    const bulletPointsString = `<ul class="popup-bullet-point">${bulletPoints.join('')}</ul>`;
    return bulletPointsString;
  }


  function appendBulletPoints(response) {
    const summaryParagraph = document.querySelector('.summary-paragraph');
    const bulletPoints = convertToBulletPoints(response);
    summaryParagraph.textContent = '';
    summaryParagraph.classList.remove('center');
    console.log('from promise', bulletPoints);
    summaryParagraph.innerHTML = bulletPoints;
  }

  const generateBtn = document.querySelector('.popup-generate-btn');
  generateBtn.addEventListener('click', function () {
    generateBtn.textContent = "Generating Synopsis...";
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
        console.log(res);
        const generateBtn = document.querySelector('.popup-generate-btn');
        appendBulletPoints(res);
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
