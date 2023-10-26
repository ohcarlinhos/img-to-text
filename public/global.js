const form = document.querySelector("form");
const submitButton = document.querySelector("#submit-button");
const fileInput = document.querySelector("#file-input");
const selectedImage = document.querySelector("#selected-image");
const copyButton = document.querySelector("#copy-button");

const showImage = (e) => {
  const { files } = e.clipboardData;
  if (!files || !files.length) return;

  fileInput.files = e.clipboardData.files;
  if (selectedImage.classList.length) selectedImage.classList.remove("hidden");

  selectedImage.src = URL.createObjectURL(e.clipboardData.files[0]);
};

const copyText = async () => {
  const textElement = document.querySelector("#text");
  const text = textElement.textContent;
  await navigator.clipboard.writeText(text.replace(/(\r\n|\n|\r)/gm, " "));
};

window.addEventListener("paste", showImage);

fileInput.addEventListener("change", showImage);
copyButton.addEventListener("click", copyText);

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
