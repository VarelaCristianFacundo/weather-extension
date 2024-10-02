chrome.runtime.sendMessage('From the content Script', response => {
  // eslint-disable-next-line no-console
  console.log(response);
  document.body.innerHTML += response.message;
});
