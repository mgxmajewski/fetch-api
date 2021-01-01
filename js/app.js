const select = document.getElementById('breeds');
const card = document.querySelector('.card');
const form = document.querySelector('form');

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
function fetchData(url) {
    return fetch(url)
        .then(res => res.json())
}

fetchData('https://dog.ceo/api/breeds/list')
    .then(data => generateOptions(data.message))

fetchData('https://dog.ceo/api/breeds/image/random')
    .then(data => generateImage(data.message))

function fetchBreadImage(){
    const breed = select.value;
    const img = card.querySelector('img');
    const p = card.querySelector('p');

    fetchData(`https://dog.ceo/api/breed/${breed}/images/random`)
        .then(data => {
            img.src = data.message;
            img.alt = breed;
            p.textContent = `Click to view more ${breed}s`
        })
}

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

function generateOptions(data) {
    const options = data.map(item => `
    <option value='${item}'>${item}</option>
    `).join('');
    select.innerHTML = options;
}

function generateImage(data) {
    const html = `
    <img src='${data}' alt>
    <p>Click to view images ${select.value}s</p>
    `;
    card.innerHTML = html;
}


// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------
select.addEventListener('change', fetchBreadImage);
card.addEventListener('click', fetchBreadImage);


// ------------------------------------------
//  POST DATA
// ------------------------------------------

