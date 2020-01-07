function updateTask(element, id) {
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
    }),
    method: "POST",
  };

  fetch(`${window.origin}/tasks/done`, options)
    .then(data => data.json())
    .then(res => {
      if (res.status === "success") {
        if (element.checked) {
          element.parentNode.parentNode
            .querySelector(".task-description")
            .classList.add("strike");
          const count = document.querySelector(".tasks-container h1 span");
          const newCount = `(${Number(
            count.textContent.substring(1, count.textContent.indexOf("/"))
          ) + 1}/${count.textContent.substring(
            count.textContent.indexOf("/") + 1
          )}`;
          count.textContent = newCount;
        } else {
          element.parentNode.parentNode
            .querySelector(".task-description")
            .classList.remove("strike");
          const count = document.querySelector(".tasks-container h1 span");
          const newCount = `(${Number(
            count.textContent.substring(1, count.textContent.indexOf("/"))
          ) - 1}/${count.textContent.substring(
            count.textContent.indexOf("/") + 1
          )}`;
          count.textContent = newCount;
        }
      }
    })
    .catch(error => console.error(error));
}
