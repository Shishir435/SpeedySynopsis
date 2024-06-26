'use strict'

console.log('Lecture Summary is working');
// alert(" Im alive guys")

var divElement = document.createElement("div");

divElement.innerHTML = `
<div class="popup">
<div class="popup-top">
    <h2>Lecture Summary</h2>
    <div class="action">
        <button class="popup-reload hide btn" title="reload extension">&#8634;</button>
        <button class="popup-copy hide btn" title="copy to clipboard">&#128203;</button>
        <button class="popup-save hide btn" title="download text file">&#128190;</button>
        <button class="popup-copied hide btn" title="copied">&#10003;</button>
        <button class="popup-close btn" title="close extension">&#10006;</button>
    </div>
</div>
<div class="popup-content">
    <div class="popup-error"></div>
    <div class="popup-instruction"></div>
    <h3 class="popup-video-title"></h3>
    <div id="summary" class="summary">
        <p class="summary-paragraph center">
            Explore curated summaries of Udemy, Coursera and Youtube video tutorials that offer concise insights to enhance your learning. These summaries are designed to complement videos with transcripts, durations under 28 minutes, and transcripts containing fewer than 4000 words. <span style="display: block; text-align:center;">Start your exploration today.</span> 
        </p>
    </div>
    <div class="popup-option-div"></div>
    <div class="popup-generate">
        <button class="popup-generate-btn">Generate Summary</button>
    </div>
</div>
<div class="popup-footer">
    <div>
        <a href="https://lecture-summary.vercel.app/" class="shishir" alt="Shishir's Website link"
            target="_blank">Need Help?</a>
    </div>
    <div>
        <a href="mailto:shishirchaurasiya435@gmail.com" alt="contact me through mail"
            target="_blank">&#9993;</a>
    </div>
</div>
</div>
  `;


document.body.appendChild(divElement);

var styleElement = document.createElement("style");
styleElement.innerHTML = `
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;600&display=swap");
.popup {
  position: absolute;
  top: 50px;
  right: 20px;
  z-index: 2147483647;
  text-align: center;
  width: 300px;
  border-radius: 10px;
  font-family: "Rubik", sans-serif;
}
.popup > * {
  padding: 5px;
}
.popup-top,
.popup-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #010101;
  padding: 2px 8px;
}
.popup-top {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.popup-top h2 {
  font-weight: 400;
  font-size: 16px;
}
.popup-content::-webkit-scrollbar {
  width: 5px;
  height: 13px;
}
.popup-content {
  padding: 8px;
  max-height: 400px;
  overflow-y: scroll;
}
.summary-paragraph {
  text-align: left;
  margin: 20px 0;
  font-size: 13px;
}
.hide {
  display: none;
}
.btn {
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
.popup-option-btn {
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
.popup-option-btn:hover {
  transform: translateY(-3px);
  transform: scale(1.1);
}

.popup-reload {
  font-size: 20px;
}
.action {
  display: flex;
  align-items: center;
  transform: translateX(5px);
}
.action:not(:last-child) {
  gap: 5px;
}
.popup-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 4px 8px;
}
.popup-footer a,
.popup-footer a:visited {
  color: currentColor;
  text-decoration: none;
}
.popup-footer a:hover {
  color: gray;
}
.shishir {
  font-size: 13px;
}
.center {
  text-align: center;
}
.popup-bullet-point-li {
  margin-left: 20px;
}

.popup-bullet-point > * {
  list-style-type: disc !important;
}
.popup-option {
  font-size: 12px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.popup-option ol li{
  font-size: 14px;
  margin: 10px 20px;
}
.popup-option ol li a{
  color: black;
  border: 1px solid green;
  padding: 2px 4px;
  margin: 2px;
  border-radius: 99px;
  text-decoration: none;
  background-color: white;
}
.popup-option-input {
  padding: 5px 10px;
  margin: 5px 20px;
  border-radius: 10px;
}
  `;

chrome.storage.local.get(['ghostApiKey'], function (result) {
  const apiKey = result.ghostApiKey;
  //  apiKey=undefined;
  if (apiKey !== "" && apiKey !== undefined) {
    getAndInjectSynopsis(apiKey);
  } else {
    const summaryParagraph = document.querySelector('.summary-paragraph');
    const generateBtn = document.querySelector('.popup-generate-btn');
    summaryParagraph.textContent = "";
    // console.log('summaryParagraph.textContent: ', summaryParagraph.textContent);
    generateBtn.classList.add('hide');
    const optionDiv = document.querySelector('.summary');
    optionDiv.innerHTML = `
  <div class="popup-option">
    <h3>Welcome to the Lecture Summary Chrome Extension!</h3>
    <p>Follow these simple steps to get started:</p>
    <ol style="text-align: left;">
        <li class="popup-bullet-point-li">
            Register on EdenAI by clicking 
            <a href="https://app.edenai.run/admin/account/settings" alt="EdenAI register link"
                target="_blank">Here
            </a>
        </li>
        <li class="popup-bullet-point-li">
            Obtain your Eden AI API Key by following the detailed steps provided in 
            <a href="https://shishirchaurasiya.hashnode.dev/easy-steps-to-sign-up-on-eden-ai-and-access-your-api-key"
                target="_blank">This Article
            </a>
        </li>
        <li class="popup-bullet-point-li">
            If you run into any challenges, check out our detailed video guide on YouTube: 
            <a href="https://www.youtube.com/watch?v=GXCeArGY6TI&ab_channel=Shishir" target="_blank">
            Watch The Guide
            </a>
        </li>
    </ol>
    <p>Once you have your API key, enter it below:</p>
    <input type="text" id="apiKeyInput" class="popup-option-input" placeholder="Paste your API key here" autofocus>
    <button id="submitApiKey" class="popup-option-btn">Submit</button>
  </div>
`
    console.log("API key not found. Please enter your API key.");
    const apiKeyInput = document.getElementById('apiKeyInput');
    const submitApiKey = document.getElementById('submitApiKey');
    submitApiKey.addEventListener('click', function () {
      // alert("got clicked")
      const message=document.querySelector('.popup-instruction');
      message.textContent = "API key successfully saved. Close the extension, then reopen it by clicking once more."
      const synopsisApiKey = apiKeyInput.value;
      if (synopsisApiKey) {
        chrome.storage.local.set({ ghostApiKey: synopsisApiKey }, function () {
          // alert("Successfully saved API Key")
          optionDiv.classList.add('hide');
        });
      }
    });
  }
});

function userPreference() {
  const popup = document.querySelector('.popup');
  const popupActionBtn = document.querySelector('.action');
  const generateDiv = document.querySelector('.popup-generate');
  const optionDiv = document.querySelector('.popup-option-div')
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    popup.style.backgroundColor = "#292929";
    popup.style.color = "#fff";
    popupActionBtn.style.color = "#fff";
    generateDiv.style.color = "#fff";
    optionDiv.style.color = "#fff";
  } else {
    popup.style.backgroundColor = "#f2f2f2";
    popup.style.color = "#212121";
    popupActionBtn.style.color = "#212121";
    generateDiv.style.color = "#212121";
    optionDiv.style.color = "#212121";
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

// function countWords(text) {
//   const words = text.split(/\s+/);
//   const wordCount = words.length;
//   // Do something with wordCount
// }
function convertDurationToMinutes(durationText) {
  const timeParts = durationText.split(':');
  let numericDuration = 0;
  for (let i = 0; i < timeParts.length; i++) {
    numericDuration += parseInt(timeParts[i]) * Math.pow(60, timeParts.length - 1 - i);
  }
  const durationInMinutes = numericDuration / 60;
  return durationInMinutes;
}

function isUnderWordLimit(text, limit) {
  const words = text.split(/\s+/);
  const wordCount = words.length;
  return wordCount <= limit;
}

function isUnderVideoDurationLimit(duration, limit) {
  let durationNum = convertDurationToMinutes(duration);
  return durationNum <= limit;
}
function getTheTranscript() {
  const Udemy = 'https://www.udemy.com/course/';
  const Coursera = 'https://www.coursera.org/learn/';
  const Youtube = 'https://www.youtube.com/watch';
  let currentTabUrl = window.location.href;
  const summaryParagraph = document.querySelector('.summary-paragraph');
  if (currentTabUrl.startsWith(Udemy)) {
    let TranscriptPanel = document.querySelector('[class^="transcript--transcript-panel"]');
    let TranscriptNode = document.querySelectorAll('[class^="transcript--cue"]');
    let sectionName = document.querySelector('[class^=lecture-view--container]').ariaLabel;
    let videoTitle = sectionName.slice(sectionName.indexOf('Lecture'))
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
  }
  else if (currentTabUrl.startsWith(Coursera)) {
    let Transcript = Array.from(document.querySelectorAll('.rc-Phrase')).map(phrase => phrase.textContent).join(' ');
    let videoTitle = document.querySelector('.video-name').textContent;
    if (Transcript === '') {
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
    return [Transcript, videoTitle];
  }
  else if (currentTabUrl.startsWith(Youtube)) {
    let Transcript = Array.from(document.querySelectorAll('.segment-text')).map(element => element.textContent).join(' ');
    console.log('Transcript: ', Transcript);
    let videoTitle = document.querySelector('h1.style-scope.ytd-watch-metadata').textContent.trim();
    let duration = document.querySelector('.ytp-time-duration').textContent;
    const generateBtn = document.querySelector('.popup-generate-btn');
    const reloadBtn = document.querySelector('.popup-reload');
    if (Transcript === '') {
      reloadBtn.classList.remove('hide');
      reloadBtn.addEventListener('click', () => {
        document.location.reload();
      })
      summaryParagraph.textContent = `Kindly click the transcript button and give it another go.`;
      generateBtn.classList.add('hide');
      return undefined;
    }
    // let videoData={
    //   title: videoTitle,
    //   duration: duration,
    //   transcript: Transcript,
    //   words: Transcript.split(/\s+/),
    //   wordsWithFilter: Transcript.split(/\s+/).filter(word => word !== ''),
    // }
    const durationChecker = isUnderVideoDurationLimit(duration, 28);
    const wordLengthChecker = isUnderWordLimit(Transcript, 4000)
    if (durationChecker && wordLengthChecker) {
      return [Transcript, videoTitle];
    } else {
      if (!durationChecker) {
         generateBtn.classList.add('hide');
        summaryParagraph.textContent = `We're sorry, but we currently cannot process videos longer than 28 minutes.`;
      } else {
         generateBtn.classList.add('hide');
        summaryParagraph.textContent = `We apologize, but it seems that this video's transcript contains more than 4000 words. Unfortunately, we are unable to process transcripts longer than 4000 words at the moment.`;
      }
      return [];
    }
  }

}

function copyToClipboard() {
  const summaryParagraph = document.querySelector('.summary-paragraph');
  const copyBtn = document.querySelector('.popup-copy');
  copyBtn.classList.remove('hide');
  copyBtn.addEventListener('click', function () {
    const videoTitle = document.querySelector('.popup-video-title');
    videoTitle.textContent = getTheTranscript()[1];
    const listItems = Array.from(summaryParagraph.querySelectorAll('li'));
    let copiedText = '•';
    copiedText += listItems.map(item => item.textContent).join('\n•');
    navigator.clipboard.writeText(videoTitle.textContent + '\n' + copiedText)
      .then(function () {
        const checkMarkIcon = document.createElement('span');
        checkMarkIcon.innerHTML = '&#10003;';
        copyBtn.textContent = '';
        copyBtn.appendChild(checkMarkIcon);
        setTimeout(function () {
          const clipboardIcon = document.createElement('span');
          clipboardIcon.innerHTML = '&#128203;';
          copyBtn.textContent = '';
          copyBtn.appendChild(clipboardIcon);
        }, 3000);
      })
      .catch(function (error) {
        const popupError = document.querySelector('.popup-error');
        popupError.textContent = `'Clipboard write failed:', ${error}`;
        console.error('Clipboard write failed:', error);
      });
  });

}

function downloadTxt() {
  const summaryParagraph = document.querySelector('.summary-paragraph');
  const saveBtn = document.querySelector('.popup-save');
  saveBtn.classList.remove('hide');
  saveBtn.addEventListener('click', function () {
    const videoTitle = document.querySelector('.popup-video-title');
    videoTitle.textContent = getTheTranscript()[1];
    const listItems = Array.from(summaryParagraph.querySelectorAll('li'));
    let copiedText = '•';
    copiedText += listItems.map(item => item.textContent).join('\n•');
    const txtText = videoTitle.textContent + '\n' + copiedText;

    const downloadPromise = new Promise((resolve, reject) => {

      const blob = new Blob([txtText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = `${videoTitle.textContent}.txt`;
      anchor.click();
      URL.revokeObjectURL(url);
      resolve();
    });

    downloadPromise
      .then(function () {
        const checkMarkIcon = document.createElement('span');
        checkMarkIcon.innerHTML = '&#10003;';
        saveBtn.textContent = '';
        saveBtn.appendChild(checkMarkIcon);

        setTimeout(function () {
          const savedIcon = document.createElement('span');
          savedIcon.innerHTML = '&#128190;';
          saveBtn.textContent = '';
          saveBtn.appendChild(savedIcon);
        }, 3000);
      })
      .catch(function (error) {
        const popupError = document.querySelector('.popup-error');
        popupError.textContent = `Sorry, we encountered an issue while trying to save the text file. Please try again later or contact support for assistance.`;
        console.error('Failed to save text file:', error);
      });
  });
}


function getAndInjectSynopsis(synopsisApiKey) {
  //  you can divide each points by '\n-'
  if (getTheTranscript().length !== 0) {
    let transcript = getTheTranscript()[0];
    let PromptText = `Summarize the provided \n ${transcript} \n in bullet point format, ensuring that the summary is approximately 30-40% of the original text. Please use concise and meaningful bullet points to capture the key points and main ideas.
   `
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
        return trimmedLine.length > 0 ? `<li class="popup-bullet-point-li" >${trimmedLine}</li>` : '';
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
      const summaryParagraph = document.querySelector('.summary-paragraph');
      fetch("https://api.edenai.run/v2/text/summarize", options)
        .then((response) => {
          console.log("inside fetch");

          console.log(response);
          if (response.status === 401 || response.status === 403) {
            summaryParagraph.textContent = "We apologize, but it seems there's an issue with your API key. Please provide your API key and ensure that it is correctly entered in a single line.";
            const optionDiv = document.createElement('div');
            optionDiv.innerHTML = `
    <div class="popup-option">
      <p>Follow these simple steps to get started:</p>
      <ol style="text-align: left;">
        <li class="popup-bullet-point-li">
            Register on EdenAI by clicking 
            <a href="https://app.edenai.run/admin/account/settings" alt="EdenAI register link"
                target="_blank">Here
            </a>
        </li>
        <li class="popup-bullet-point-li">
            Obtain your Eden AI API Key by following the detailed steps provided in 
            <a href="https://shishirchaurasiya.hashnode.dev/easy-steps-to-sign-up-on-eden-ai-and-access-your-api-key"
                target="_blank">This Article
            </a>
        </li>
        <li class="popup-bullet-point-li">
            If you run into any challenges, check out our detailed video guide on YouTube: 
            <a href="https://www.youtube.com/watch?v=GXCeArGY6TI&ab_channel=Shishir" target="_blank">
            Watch The Guide
            </a>
        </li>
      </ol>
      <p>Once you have your API key, enter it below:</p>
      <input type="text" id="apiKeyInput" class="popup-option-input" autofocus>
      <button id="submitApiKey" class="popup-option-btn">Submit</button>
    </div>
            `
            const optionPopup = document.querySelector('.popup-option-div');
            optionPopup.appendChild(optionDiv);
            const generateBtn = document.querySelector('.popup-generate-btn');
            generateBtn.classList.add('hide');
            console.log("API key not found. Please enter your API key.");
            const apiKeyInput = document.getElementById('apiKeyInput');
            const submitApiKey = document.getElementById('submitApiKey');
            submitApiKey.addEventListener('click', function () {
              const synopsisApiKey = apiKeyInput.value;
              if (synopsisApiKey) {
                chrome.storage.local.set({ ghostApiKey: synopsisApiKey }, function () {
                  optionPopup.classList.add('hide');
                });
                summaryParagraph.textContent = "API key successfully saved. Close the extension, then reopen it by clicking once more";
              }
            });

            console.error(`Oops! It looks like your api key is wrong. please submit api key and make sure that it is in a single line\n `);
          } else if (!response.ok) {
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
          let title = getTheTranscript();
          const videoTitle = document.querySelector('.popup-video-title');
          videoTitle.textContent = title[1];
          generateBtn.classList.add('hide');
          copyToClipboard();
          downloadTxt();
        })
        .catch((error) => {
          console.error(error);
          summaryParagraph.textContent = "Sorry we encountered an error please try again";
          generateBtn.classList.add('hide');

        });
    })
  }

}

