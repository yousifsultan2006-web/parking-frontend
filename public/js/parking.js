window.onload = () => {
    
    const button = document.querySelector("#load-button");
}

button.onclick = loadRecordsFetch;
function loadRecordsAxios() {

}
async function loadRecordsFetch() {
try {
    const uri = "http://localhost:8001/api/fake/campus/parkingSpots";
    const config = { method: "get"};

    const response = await fetch(uri, config);
    if (!response.ok) return showError(response.statusText, response.status);
    else hideError();

const records = await response.json();
showRecords(records);

} catch (err) {
    console.log(err);
    console.log("Network Failure");
}
}
function showRecords(records) {
document.querySelector("#records")
recordsArea.innerHTML = ""; //remove all content in the panel

//add the records to the panel
for (const record of records.data) {
const html = getParkingSpotCard(record);
recordsArea.innerHTML += html;
}
}
function readFormEntries() {
    return {
        lot: document.querySelector("#lot-input").value,
        spotNumber: document.querySelector("#spot-input").value,
        status: document.querySelector("#status-input").value,
        note: document.querySelector("#note-input").value,
    }
}

function getParkingSpotCard(spot) {
    const { id, lot, spotNumber, status, note } = spot;

    return `
        <article class="record-card">
            <ul class="record-card-list">
                <li class="record-card-row">
                    <span class="record-card-label">id</span>
                    <span class="record-card-value">${id}</span>
                </li>

                <li class="record-card-row">
                    <span class="record-card-label">lot</span>
                    <span class="record-card-value">${lot}</span>
                </li>

                <li class="record-card-row">
                    <span class="record-card-label">spotNumber</span>
                    <span class="record-card-value">${spotNumber}</span>
                </li>

                <li class="record-card-row">
                    <span class="record-card-label">status</span>
                    <span class="record-card-value">${status}</span>
                </li>

                <li class="record-card-row">
                    <span class="record-card-label">note</span>
                    <span class="record-card-value">${note}</span>
                </li>
            </ul>
        </article>
    `;
}

function showError(code, message) {
    const el = document.querySelector("#error-box");

    if (code) el.textContent = `Status: ${code}, Message: ${message}`;
    else el.textContent = `Message: ${message}`;
    
    el.hidden = false;
};

function hideError() {
    const el = document.querySelector("#error-box");
    el.hidden = true;
}