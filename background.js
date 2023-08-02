

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: 'OFF'
  });
});

const Udemy= 'https://www.udemy.com/course/';
const Coursera= 'https://www.coursera.org/learn/'


// When the user clicks on the extension action
chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.startsWith(Udemy)||tab.url.startsWith(Coursera)) {

    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
  
    const nextState = prevState === 'ON' ? 'OFF' : 'ON';

   
    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState
    });

    if (nextState === 'ON') {
      chrome.scripting
      .executeScript({
        target : {tabId : tab.id},
        files : [ "script.js" ],
      })
      .then(() => console.log("script injected"));
    } else if (nextState === 'OFF') {

      await chrome.scripting.executeScript({
        files: ['off.js'],
        target: { tabId: tab.id }
      });
    }
  }

 

});


chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === 'closeButtonClicked') {
    // When the closeButton is clicked, set nextState to 'OFF'
    const tabId = sender.tab.id;
    chrome.action.setBadgeText({ tabId, text: 'OFF' });
  }
  
});



