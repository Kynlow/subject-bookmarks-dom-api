const $form = document.querySelector("#favori-form");
const $ul = document.querySelector("ul");

let timerInterval = null;

document.addEventListener("DOMContentLoaded", interval());

$form.addEventListener("submit", (e) => {
    e.preventDefault()
	const formdata = new FormData($form);
	const title = formdata.get("titre");
	const url = formdata.get("url");
	const description = formdata.get("description");
	addDatasOnAPI(title, url, description);
    $form.reset()
});

function addDatasOnPage(title, url, description) {
	const $li = document.createElement("li");
	$li.innerHTML = `<a href="${url}" target="_blank">${title}</a>
            <p class="description">
              ${description}
            </p>`;
	$ul.appendChild($li);
}

async function addDatasOnAPI(titleContent, urlContent, descriptionContent) {
	const request = await fetch(`http://10.69.4.8:8100/bookmarks`, {
		method: "POST",
		headers: {
			Authorization: "Bearer 2495022d236a639a59f3b149b6cf60eb",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			title: titleContent,
			url: urlContent,
			description: descriptionContent,
		}),
	});

	addDatasOnPage(titleContent, urlContent, descriptionContent);
}

async function getDatasOnAPI() {
	const request = await fetch("http://10.69.4.8:8100/bookmarks");
	const response = await request.json();
	$ul.innerHTML = "";
	for (let i = 0; i < response.length; i++) {
		addDatasOnPage(
			response[i].title,
			response[i].url,
			response[i].description,
		);
	}
}

async function interval() {
	timerInterval = setInterval(() => {
		getDatasOnAPI();
	}, 3000);
}
