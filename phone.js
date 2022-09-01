

const loadElectronic = async (searchText, dataLimit) => {
    const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url)
    const data = await res.json()
    displayElectronics(data.data, dataLimit);
}

const displayElectronics = (data, dataLimit) => {


    /*Card design Part */

    const electronicContainer = document.getElementById('electronic-container');
    electronicContainer.innerText = '';

    // upto 10 electronic device show
    const showAll = document.getElementById('show-all');


    if (dataLimit && data.length > 10) {
        data = data.slice(0, 10);
        showAll.classList.remove('d-none');

    }

    else {
        showAll.classList.add('d-none');
    }


    /// No matching is found
    const noItem = document.getElementById('no-item');

    if (data.length == 0) {
        noItem.classList.remove('d-none');
    }

    else {
        noItem.classList.add('d-none');
    }

    //// Card part design
    data.forEach(info => {
        const divContainer = document.createElement('div');
        divContainer.classList.add('col')
        divContainer.innerHTML = `

                <div class="card h-25 w-100 mb-4">
                    <img src="${info.image}"  class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${info.phone_name}</h5>
                        <p class="card-text">${info.brand}</p>
                        <button onclick="loadElectronicDetails('${info.slug}')" href="#" class="btn btn-primary  p-1" data-bs-toggle="modal" data-bs-target="#electronicDetailModal">Details</button>
                        
           
                    </div>
                </div>


    `;

        electronicContainer.appendChild(divContainer);
    })

    // stop loader
    loadSpin(false);

}


const processing = (dataLimit) => {

    // start loading
    loadSpin(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadElectronic(searchText, dataLimit);
    searchField.innerText = '';

}



/* button click koray search field nia jabay */

document.getElementById('btn-search').addEventListener('click', function () {

    processing(10);

})


/* search input field enter key handaler */

document.getElementById('search-field').addEventListener('keypress', function (e) {

    if (e.key === 'Enter') {
        processing(10);

    }
});


/* Spin Loader  */

const loadSpin = isLoading => {
    const loading = document.getElementById('spinLoader');
    if (isLoading) {
        loading.classList.remove('d-none');
    }

    else {
        loading.classList.add('d-none');
    }
}


/// all data show 

document.getElementById('btn-all').addEventListener('click', function () {

    processing();
})

/* Dynamic Api Data load */

const loadElectronicDetails = async id => {
    url = `https://openapi.programming-hero.com/api/phone/${id}`
    res = await fetch(url)
    data = await res.json()
    displayModalInfo(data.data)
}

/*Modal design */


const displayModalInfo = detail => {
    console.log(detail);
    const electronicM = document.getElementById('electronicDetailModalLabel');
    electronicM.innerText = detail.name;

    const otherInfo = document.getElementById('other-info');

    otherInfo.innerHTML =

        `
   
            <img src="${detail.image}" class="h-25 w-25 mb-4">
           <p> Display: ${detail.mainFeatures.displaySize} <\p>
            <p>Memory: ${detail.mainFeatures.memory} <\p>
             <p>Release Date: ${detail.releaseDate ? detail.releaseDate : 'No release date is found'} <\p>

    `;
}

loadElectronic('a');

