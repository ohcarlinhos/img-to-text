const form = document.querySelector("form");
const submitButton = document.querySelector("#submit-button");
const fileInput = document.querySelector("#file-input");

const addTextToView = (text) => {
  const textElement = document.querySelector("#text");
  textElement.textContent = text;
  textElement.className = "p-4 mb-3 border-b border-gray-250";
};

addTextToView("This is a example text!");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData();
  formData.append("file", fileInput.files[0]);

  submitButton.disabled = true;
  fetch("/img", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then(({ text }) => {
      addTextToView(text);
    })
    .finally(() => {
      submitButton.disabled = false;
    });
});
