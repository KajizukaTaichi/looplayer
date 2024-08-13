function showConfirm(message, callback) {
  // Function to close and remove the dialog
  function closeDialog() {
    document.body.removeChild(overlay);
  }

  // Create overlay
  var overlay = document.createElement("div");
  overlay.className = "confirm-overlay";

  // Create confirm box
  const box = document.createElement("div");
  box.className = "confirm-box";

  // Add title
  const title = document.createElement("h2");
  title.textContent = "Confirm";
  box.appendChild(title);

  // Add message
  const messageElem = document.createElement("p");
  messageElem.textContent = message;
  box.appendChild(messageElem);

  // Add buttons
  const yesButton = document.createElement("button");
  yesButton.textContent = "Yes";
  yesButton.className = "confirm-button confirm-yes";
  yesButton.addEventListener("click", function () {
    callback(true);
    closeDialog();
  });
  box.appendChild(yesButton);

  const noButton = document.createElement("button");
  noButton.textContent = "No";
  noButton.className = "confirm-button confirm-no";
  noButton.addEventListener("click", function () {
    callback(false);
    closeDialog();
  });
  box.appendChild(noButton);

  // Append box to overlay
  overlay.appendChild(box);

  // Append overlay to body
  document.body.appendChild(overlay);
}
