const searchBook = ()=>{
    // get search field 
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value='';

    // fetch data for book search 
    const url = `http://openlibrary.org/search.json?q=${searchText}`
    fetch(url)
    .then(response => response.json())
    .then(bookInfo => displaySearchResult(bookInfo.docs));
}

const displaySearchResult = books => {
    // get search result field 
    const searchResult = document.getElementById('search-result') 
    // get search Result counter field 
    const resultCounter = document.getElementById('result-found');

    if (books.length === 0){
    // if result not found 
    searchResult.innerHTML = "";
    resultCounter.innerHTML = "";
    const div = document.createElement('h5');
    div.innerHTML = `<h3 class= "text-danger">Sorry no result founded</h3>`;
    resultCounter.appendChild(div);
    }

    else{
    // else result found 
    searchResult.innerHTML = "";
    books.forEach(book => {
    // get object and class property value  
    const [author] = [book.author_name];
    const imageId = book.cover_i;
        if (book.first_publish_year === undefined){
        // if publish date are not found 
        book.first_publish_year = "Not found";
        }
        if (imageId === undefined ){
        // if image is not available 
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = `
        <div class="col">
            <div class="h-150 w-75 mx-5">
                <h4 class ="text-center py-5">No Image Found</h4>
                <div class="card-body">
                    <h3 class="card-title py-3">${book.title}</h3>
                    <h5 class="card-text py-3">${author}</h5>             
                </div>
                <div class="card-footer">
                    <small >First Publish year : ${book.first_publish_year} </small>
                </div>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
        }
        else{
        // else image is available 
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = `
        <div class="col">
            <div class="card h-150 w-75 mx-5">
                <img height="500" src="https://covers.openlibrary.org/b/id/${imageId}-M.jpg" class="card-img-top" alt="Book-image">
                <div class="card-body">
                    <h3 class="card-title py-3">${book.title}</h3>
                    <h5 class="card-text py-3">${author}</h5>             
                </div>
                <div class="card-footer">
                    <small >First Publish year : ${book.first_publish_year} </small>
                </div>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
        }   
        
    })
}
    // Display result amount 
    if(books.length!==0){
    resultCounter.innerHTML = "";
    const div = document.createElement('h5');
    div.innerHTML = `<h5 class= "text-success">Total ${books.length} books founded</h5>`;
    resultCounter.appendChild(div);
    }
}