

  function downloadTxtFile(data) {
      console.log("getting called");
      const fileName=data.title;
      console.log('fileName: ', fileName);
      const textContent = JSON.stringify(data, null, 2); // Convert the object to nicely formatted JSON
      const blob = new Blob([textContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName + '.txt'; // Add the file extension
      // Programmatically simulate a click event on the link
      const clickEvent = new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: false
      });
      a.dispatchEvent(clickEvent);

      // Clean up: revoke the object URL to free up memory
      URL.revokeObjectURL(url);
  }

// call this function inside a function