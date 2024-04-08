const formElem = document.getElementsByTagName("form")[0];
const loader = document.getElementsByClassName("loader")[0];
const errorElem = document.getElementById("errors");
const resultsElem = document.getElementById("results-tag");

formElem.addEventListener("submit", async function (e) {
  e.preventDefault();
  loader.style.display = "flex";

  const formData = new FormData(e.currentTarget);
  const { email } = Object.fromEntries(formData);
  const key = "ema_live_D4lODQs7lYQr18XC5C7b6vV3R4Zhj2oqv2imTEq7";

  const url = `https://api.emailvalidation.io/v1/info?apikey=${key}&email=${email}`;
  errorElem.innerHTML = "";
  resultsElem.innerHTML = "";

  try {
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.errors) {
          errorElem.innerHTML = data.errors.email[0];
        } else {
          errorElem.innerHTML = "";
        }
        resultsElem.innerHTML = `<code>${JSON.stringify(data, null, 2)}</code>`;
        resultsElem.style.display = "block";

        loader.style.display = "none";
      });
  } catch (error) {
    let errMessage = error.errors.email[0];
    errorElem.innerHTML = errMessage;
    loader.style.display = "none";
  }
});
