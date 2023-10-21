const form = document.querySelector("form");
const submitButton = document.querySelector("#submit-button");
const fileInput = document.querySelector("#file-input");

const addTextToView = (text, error = false) => {
  const textElement = document.querySelector("#text");
  let className = "p-4 mb-3 border-b border-gray-250";

  if (error) className += " bg-red-100";

  textElement.textContent = text;
  textElement.className = className;
};

addTextToView("This is a example text!");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData();
  formData.append("file", fileInput.files[0]);

  try {
    submitButton.disabled = true;

    const res = await fetch("/img", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message);
    }

    const { text } = await res.json();
    addTextToView(text);
  } catch (err) {
    addTextToView(err.message || "Error! Please try again.", true);
  } finally {
    submitButton.disabled = false;
  }
});
