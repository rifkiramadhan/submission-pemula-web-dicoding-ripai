const getSearchBook = () => {
    let search = document.getElementById('search').value;

    let cardBooks = document.getElementsByClassName('book');
    for ( itemBook of cardBooks) {
        let textInBook = itemBook.innerText.toUpperCase();
        let checkSearchBook = textInBook.search(search.toUpperCase());
        
        if(checkSearchBook == -1) { itemBook.style.display = "none"; }
        else { itemBook.style.display = ""; }
    }
}