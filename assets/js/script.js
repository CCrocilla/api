// "https://ci-jshint.herokuapp.com/api?api_key=tkd9tw-N6aTSDYcPaxNN3B1VpfI"
const API_KEY = "tkd9tw-N6aTSDYcPaxNN3B1VpfI";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"));

document.getElementById("status").addEventListener("click", e => getStatus(e));

document.getElementById("submit").addEventListener("click", e => postForm(e));


async function postForm(e) {
    const form = new FormData(document.getElementById("checksform"));

    // The for below will iterate in all the info that we want to post. 
    // for (let e of form.entries()) {
    //     console.log(e)
    // }

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Authorization": API_KEY,
        },
        body: form,

    });

    const data = await response.json();

    if (response.ok) {
        displayError(data);
    } else {
        throw new Error(data.error);
    }
}


function displayError(data) {
    let heading = `JSHint Result for ${data.file}`;

    if (data.total_errors === 0) {
        results = `<div class="no_error">No errors reported!</div>`
    } else {
        results = `<div>Total Errors: <span class="error_count">${data.total_errors}</span></div>`
        for (let error of data.error_list) {
            results += `<div>At line <span class="line">${error.line}</span>,`;
            results += `column <span class="column">${error.col}</span></div>`;
            results += `<div class="error">${error.error}</div>`;
        }
    }

    document.getElementById("resultsModalTitle").innerText = heading;
    document.getElementById("results-content").innerHTML = results;
    resultsModal.show();
}


async function getStatus(e) {
    const queryString = `${API_URL}?api_key=${API_KEY}`;

    const response = await fetch(queryString);

    const data = await response.json();

    if (response.ok) {
        displayStatus(data);
    } else {
        throw new Error(data.error);
    }
}

function displayStatus(data) {
    let title = "API Key Status";
    let results = `<div>Your key is valid until:</div>`;
    results += `<div class="key-status">${data.expiry}</div>`;

    document.getElementById("resultsModalTitle").innerText = title;
    document.getElementById("results-content").innerHTML = results;
    resultsModal.show();
}