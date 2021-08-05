const getDataFormBook = () => {
    const id = new Date().getTime();
    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('author').value;
    const year = document.getElementById('year').value;
    const isRead = document.getElementById('read').checked;
    
    const bookData = getMakeBook(title, author, year, isRead);
    let target;
  
    const bookObject = getComposeBookObject(title, author, year, isRead);
  
    bookData['bookId'] = bookObject.id;
    dataBook.push(bookObject);
  
    if (isRead) { target = 'bodyComplete'; }
    else { target = 'bodyUnComplete'; }
  
    document.getElementById(target).appendChild(bookData);
    getUpdateDataBook();
  }
  
  const getMakeBook = (title, author, year, isRead) => {
    const h3 = document.createElement('h3');
    const p = document.createElement('p');
  
    h3.innerHTML = '<span>' + title + '</span> ( <i>' + year + '</i> ).';
    p.innerHTML = 'Penulis : <i>' + author + '</i>';
  
    const div = document.createElement('div');
    div.setAttribute('class', 'book');
    div.appendChild(h3);
    div.appendChild(p);
    
    const button = document.createElement('div');
    button.classList.add('bookButton');
  
    if (isRead) { button.append(getCreateUnReadBtn(), getDeleteDataBookBtn()); }
    else { button.append(getCreateDoneReadBtn(), getDeleteDataBookBtn()); }
  
    div.appendChild(button);
    return div;
  }
  
  const getCreateButton = (buttonName, buttonTypeClass , eventListener) => {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.innerText = buttonName;
    button.addEventListener("click", (event) => {
        eventListener(event);
    });
    return button;
  }
  
  const getCreateDoneReadBtn = () => {
    return getCreateButton("bookmark_border", "doneReadBtn" && "material-icons", (event) => {
        getReadCompleted(event.target.parentElement.parentElement);
    });
  }
  
  const getCreateUnReadBtn = () => {
    return getCreateButton("bookmark", "unReadBtn" && "material-icons", (event) => {
        getUndoFromReadCompleted(event.target.parentElement.parentElement);
    });
  }
  
  const getDeleteDataBookBtn = () => {
      return getCreateButton("delete", "deleteBtn" && "material-icons", (event) => {
  
      let yakin = confirm("Apakah Anda yakin akan meghapus buku ini ?");
      if (yakin) {
          deleteDataBook(event.target.parentElement.parentElement);
           alert("Buku Anda telah dihapus");
        } else {
            alert("Buku Anda tidak dihapus");
        } 
    });  
  }
  
  const getReadCompleted = (taskElement) => {
    const bookcompleted = document.getElementById('bodyComplete');
    
    const title = taskElement.querySelector('h3 span').innerText;
    const author = taskElement.querySelector("p i").innerText;
    const year = taskElement.querySelector("h3 i").innerText;
  
    const book = getMakeBook(title, author, year, true);
    bookcompleted.append(book);
  
    const fineBook = getFindBook(taskElement['bookId']);
    fineBook.isRead = true;
    book['bookId'] = fineBook.id;
    
    taskElement.remove();
    getUpdateDataBook();
  }
  
  const getUndoFromReadCompleted = (taskElement) => {
    const bookUncompleted = document.getElementById('bodyUnComplete');
  
    const title = taskElement.querySelector('h3 span').innerText;
    const author = taskElement.querySelector("p i").innerText;
    const year = taskElement.querySelector("h3 i").innerText;
  
    const book = getMakeBook(title, author, year, false);
    bookUncompleted.append(book);
  
    const fineBook = getFindBook(taskElement['bookId']);
    fineBook.isRead = false;
    book['bookId'] = fineBook.id;
    
    taskElement.remove();
    getUpdateDataBook();
  }
  
  const deleteDataBook = (taskElement) => {
    const bookPosition = getFindBookIndex(taskElement['bookId']);
    dataBook.splice(bookPosition, 1);
  
    taskElement.remove();
    getUpdateDataBook();
  }