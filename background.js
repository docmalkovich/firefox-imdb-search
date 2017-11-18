/*
Called when the item has been created, or when creation failed due to an error.
We'll just log success/failure here.
*/
function onCreated() {
  if (browser.runtime.lastError) {
    console.log(`Error: ${browser.runtime.lastError}`);
  } else {
    console.log("Item created successfully");
  }
}

/*
Called when the item has been removed.
We'll just log success here.
*/
function onRemoved() {
  console.log("Item removed successfully");
}

/*
Called when there was an error.
We'll just log the error here.
*/
function onError(error) {
  console.log(`Error: ${error}`);
}

/*
Create context menu.
*/
browser.menus.create({
  id: "open_imdb",
  title: "Search this in IMDb",
  contexts: ["selection"],
  icons: {
    "48": "icons/icons8-imdb-48.png",
	"32": "icons/icons8-imdb-32.png",
	"16": "icons/icons8-imdb-16.png"
  }	
}, onCreated);


function searchIMDB(txt) {
    browser.tabs.create({
      url: 'http://www.imdb.com/find?s=all&q='+txt
    });
}


/*
The click event listener, where we perform the appropriate action given the
ID of the menu item that was clicked.
*/
browser.menus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case "open_imdb":
      console.log(info.selectionText);
	  searchIMDB(info.selectionText);
      break;
   }
});
