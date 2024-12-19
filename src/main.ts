/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log("Script started successfully");
console.log("OK BABAYT");

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit()
  .then(() => {
    console.log("Scripting API ready");
    console.log("Player tags: ", WA.player.tags);

    // Bot interaction area
    WA.room.area.onEnter("clock").subscribe(() => {
      console.log("AAAAAAA");
      currentPopup = WA.ui.openPopup(
        "botPopup",
        "Hello! I'm HelpfulBot. How can I assist you today?",
        [
          {
            label: "Chat with Bot",
            callback: () => {
              // Open chat interface or trigger bot interaction
              WA.chat.open();
              closePopup();
            },
          },
        ]
      );
    });

    WA.room.area.onLeave("clock").subscribe(closePopup);

    // Listen for chat messages to interact with bot
    WA.chat.onChatMessage((message) => {
      console.log("Received chat message:", message);
      // You can add additional logic here to handle bot interactions
    });

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra()
      .then(() => {
        console.log("Scripting API Extra ready");
      })
      .catch((e) => console.error(e));
  })
  .catch((e) => console.error(e));

function closePopup() {
  if (currentPopup !== undefined) {
    currentPopup.close();
    currentPopup = undefined;
  }
}

export {};
