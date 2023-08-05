
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
             <div class="popup-instruction"></div>
             <p class="popup-video-title"></p>
             <div id="summary" class="summary">
             <p class="summary-paragraph center">  
             Unlock curated summaries of Udemy and Coursera Video Tutorials. Elevate your learning with concise insights. <br> <span style="display: block; text-align:center;"> Start exploring now.</span>
             </p>
             </div>
             <div class="popup-option-div"></div>
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


function optionPopup(){
  
}
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
      .popup-generate-btn,
      .popup-option-btn
      {
        cursor: pointer;
        margin: 20px;
        border-radius: 999px;
        padding: 5px 10px;
        border: 2px solid currentColor;
        color: currentColor;
        background-color: transparent;
        transition: transform 0.2s ease-in-out;
      }
      .popup-generate-btn:hover,
      .popup-option-btn:hover{
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
      .popup-option{
        display: flex;
        flex-direction: column;
        gap: 5px;
      }
      .popup-option-input{
        padding: 5px 10px;
        margin: 5px 20px;
        border-radius: 10px;
      }
  `;

  chrome.storage.local.get(['ghostApiKey'], function(result) {
    const apiKey = result.ghostApiKey;
        //  apiKey=undefined;
    if (apiKey!=="" && apiKey!==undefined) {
      // API key is present, proceed with functionality
      // performFunctionality(apiKey);
      getAndInjectSynopsis(apiKey);
    } else {
      var optionDiv= document.createElement('div');
      optionDiv.innerHTML=`
        <div class="popup-option">
        <a href="https://app.edenai.run/admin/account/settings" alt="EdenAi register link" target="_blank">EdenAI</a>
        <p>Follow <a href="https://shishirchaurasiya.hashnode.dev/easy-steps-to-sign-up-on-eden-ai-and-access-your-api-key" target="_blank">this</a> article if you are still facing an issue</p>
        <p>Enter your API key:</p>
        <input type="text" id="apiKeyInput" class="popup-option-input" autofocus>
        <button id="submitApiKey" class="popup-option-btn">Submit</button>
        </div>
        `
      const optionPopup=document.querySelector('.popup-option-div');
      optionPopup.appendChild(optionDiv);
      const summaryParagraph= document.querySelector('.summary-paragraph');
      const generateBtn=document.querySelector('.popup-generate-btn');
      summaryParagraph.textContent="Kindly create an account on the EdenAI website and  retrieve the API key. Once you have the API key, enter it in the provided input box.";
      generateBtn.classList.add('hide');
      // API key is not present, handle accordingly (maybe show an error message)
      console.log("API key not found. Please enter your API key.");
      const apiKeyInput = document.getElementById('apiKeyInput');
      const submitApiKey = document.getElementById('submitApiKey');
      submitApiKey.addEventListener('click', function() {
      const synopsisApiKey = apiKeyInput.value;
      if (synopsisApiKey) {
      // Save the API key to local storage
      chrome.storage.local.set({ ghostApiKey: synopsisApiKey }, function() {
         optionPopup.classList.add('hide');
      });
      summaryParagraph.textContent="API key successfully saved. Close the extension, then reopen it by clicking once more.";
    }
  });
    }
  });

function userPreference() {
  const popup = document.querySelector('.popup');
  const popupActionBtn = document.querySelector('.action');
  const generateDiv = document.querySelector('.popup-generate');
  const optionDiv=document.querySelector('.popup-option-div')
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    popup.style.backgroundColor = "#292929";
    popup.style.color = "#fff";
    popupActionBtn.style.color = "#fff";
    generateDiv.style.color = "#fff";
    optionDiv.style.color= "#fff";
  } else {
    popup.style.backgroundColor = "#f2f2f2";
    popup.style.color = "#212121";
    popupActionBtn.style.color = "#212121";
    generateDiv.style.color = "#212121";
    optionDiv.style.color= "#212121";
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
    let sectionName=document.querySelector('[class^=lecture-view--container]').ariaLabel;
    let videoTitle=sectionName.slice(sectionName.indexOf('Lecture'))
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
    return [transcript, videoTitle];
  } else if (currentTabUrl.startsWith(Coursera)) {
    let TranscriptNode = document.querySelectorAll('.phrases');
    let videoTitle=document.querySelector('.video-name').textContent;
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
    return [transcript, videoTitle];
  }

}
getTheTranscript();

function copyToClipboard() {
  const summaryParagraph = document.querySelector('.summary-paragraph');
  const copyBtn = document.querySelector('.popup-copy');
  const copiedBtn = document.querySelector('.popup-copied');
  copyBtn.classList.remove('hide');

  copyBtn.addEventListener('click', function () {
        const videoTitle= document.querySelector('.popup-video-title');
        videoTitle.textContent=getTheTranscript()[1];
    const listItems = Array.from(summaryParagraph.querySelectorAll('li'));
    const copiedText = listItems.map(item => item.textContent).join('\n•');
    navigator.clipboard.writeText(videoTitle.textContent + '\n'+ copiedText)
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

function getAndInjectSynopsis(synopsisApiKey){

if (getTheTranscript().length !==0) {
  let transcript= getTheTranscript[0];
  let PromptText = `Generate summary notes based on the provided text input. Summarize the content into organized bullet points, highlighting key ideas, concepts, and relevant details. Ensure each bullet point is clear, succinct, and captures a distinct piece of information. you can divide each points by '\n-' ${transcript}`
  let options = {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${synopsisApiKey}`,
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
    const lines = response.split(/\n-|\n•/);
    const bulletPoints = lines.map(line => {
      const firstColonIndex = line.indexOf(':');
      const lineWithoutFirstColon = firstColonIndex !== -1 ? line.slice(firstColonIndex + 1) : line;
      const trimmedLine = lineWithoutFirstColon.trim();
      return trimmedLine.length > 0 ? `<li>${trimmedLine}</li>` : '';
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
        if (response.status === 401 || response.status === 403) {
          const summaryParagraph = document.querySelector('.summary-paragraph');
         summaryParagraph.textContent="We apologize, but it seems there's an issue with your API key. Please provide your API key and ensure that it is correctly entered in a single line.";
          
          var optionDiv= document.createElement('div');
          optionDiv.innerHTML=`
          <div class="popup-option">
        <a href="https://app.edenai.run/admin/account/settings" alt="EdenAi register link" target="_blank">EdenAI</a>
        <p>Follow <a href="https://shishirchaurasiya.hashnode.dev/easy-steps-to-sign-up-on-eden-ai-and-access-your-api-key" target="_blank">this</a> article if you are still facing an issue</p>
        <p>Enter your API key:</p>
        <input type="text" id="apiKeyInput" class="popup-option-input" autofocus>
        <button id="submitApiKey" class="popup-option-btn">Submit</button>
        </div>
            `
          const optionPopup=document.querySelector('.popup-option-div');
          optionPopup.appendChild(optionDiv);
          const generateBtn=document.querySelector('.popup-generate-btn');
          generateBtn.classList.add('hide');
          // API key is not present, handle accordingly (maybe show an error message)
          console.log("API key not found. Please enter your API key.");
          const apiKeyInput = document.getElementById('apiKeyInput');
          const submitApiKey = document.getElementById('submitApiKey');
          submitApiKey.addEventListener('click', function() {
          const synopsisApiKey = apiKeyInput.value;
          if (synopsisApiKey) {
          // Save the API key to local storage
          chrome.storage.local.set({ ghostApiKey: synopsisApiKey }, function() {
             optionPopup.classList.add('hide');
          });
          // const popupContent= document.querySelector('.popup-content');
          // popupContent.textContent="API key successfully saved. Close the extension, then reopen it by clicking once more.";
          summaryParagraph.textContent="API key successfully saved. Close the extension, then reopen it by clicking once more";
        }
      });

          console.error(`Oops! It looks like your api key is wrong. please submit api key and make sure that it is in a single line\n `);
        } else if(!response.ok){
          const generateBtn = document.querySelector('.popup-generate-btn');
          generateBtn.classList.add('hide');
          throw new Error(`Oops! Something went wrong while fetching the summary. Please refresh the page and try again. Error Code: ${response.status} \n `);
        }


      
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const res = data.openai.result;
        console.log(res);
        const generateBtn = document.querySelector('.popup-generate-btn');
        appendBulletPoints(res);
        let title=getTheTranscript();
        const videoTitle= document.querySelector('.popup-video-title');
        videoTitle.textContent=title[1];
        // const summaryParagraph= document.querySelector('.summary-paragraph');
        // summaryParagraph.textContent=res;
        generateBtn.classList.add('hide');
        copyToClipboard();
      })
      .catch((error) => {
        // const summaryParagraph = document.querySelector('.summary-paragraph');
        // summaryParagraph.textContent = `\n ${error}`
        console.error(error);
      });

  })
}

}






// Emvista