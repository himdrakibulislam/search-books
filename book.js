const searchText = document.getElementById('search-field');
const showBooks = document.getElementById('show-book');
const empty = document.getElementById('empty');
const result = document.getElementById('result');
const toggleSpinner = (style) =>{
  document.getElementById('spinner').style.display = style;
}
const searchField = () =>{
    const searchField = searchText.value;
    if(searchField  === ''){
      showBooks.textContent = '';
      empty.innerText = "PLEASE WRITE A BOOK NAME"
      result.innerText = '';
    }else{
      empty.innerText = '';
      showBooks.textContent = '';
    searchText.value = '';
    result.innerText = '';
    toggleSpinner('block');
    const url = `https://openlibrary.org/search.json?q=${searchField}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayBook(data.docs) )
    }
    
}
const displayBook =(data) =>{
    data.forEach( book => {
        const div = document.createElement('div');
        const image = `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
        div.innerHTML = `
        <div class="card mt-3" style="width: 18rem;">
        <img src="${image}" id="img" class="img-fluid" alt="...">
        <div class="card-body">
          <h5 class="card-title">Name : ${book.title}</h5>
          <p class="card-text">Author : ${book.author_name}</p>
          <p class="card-text">Publish Date : ${book.publish_date}</p>
          <a href="#" class="btn btn-primary">BUY NOW</a>
        </div>
      </div>
       `;
       showBooks.appendChild(div);
    });
    result.innerText = `RESULT FOUND ${data.length} SHOWING ${data.length}`
    toggleSpinner('none');
}
