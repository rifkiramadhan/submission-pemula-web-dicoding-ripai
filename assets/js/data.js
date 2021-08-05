let dataBook = [];

const getCheckStroage = () => {
    if(typeof(Storage) !== undefined) {
        return true;
    }
    return false;
}

const getSaveData = () => {
    const parsed = JSON.stringify(dataBook);
    localStorage.setItem('datas_of_book', parsed);
    document.dispatchEvent(new Event("onSaveDatas"));
}

const getDataInStorage = () => {
    const dataInStorage = localStorage.getItem('datas_of_book');

    let datas = JSON.parse(dataInStorage);

    if(datas !== null) { dataBook = datas; }

    document.dispatchEvent(new Event('onLoadDatas'));
}

const getUpdateDataBook = () => {
    if(getCheckStroage()) { getSaveData(); }
}
  
const getComposeBookObject = (title, author, year, isRead) => {
    return {
        id: new Date().getTime(),
        title,
        author,
        year,
        isRead
    };
}
  
const getFindBook = (bookId) => {
    for(book of dataBook){
        if(book.id === bookId) { return book; }
    }
    return null;
}
  
  
const getFindBookIndex = (bookId) => {
    let index = 0;
    for (book of dataBook) {
        if(book.id === bookId) { return index; }
        index++;
    }
    return -1;
}

const getRefreshData = () => {
    const listUnRead = document.getElementById('bodyUnComplete');
    let listRead = document.getElementById('bodyComplete');
  
    for(itemBook of dataBook){
        const book = getMakeBook(itemBook.title, itemBook.author, itemBook.year, itemBook.isRead);
        book['bookId'] = itemBook.id;
        
        if(itemBook.isRead){
            listRead.append(book);
        } else {
            listUnRead.append(book);
        }
    }
 }