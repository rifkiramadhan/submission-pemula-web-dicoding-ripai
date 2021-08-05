document.addEventListener("DOMContentLoaded", () => {
 
    const submitFormBook = document.getElementById("formBook");
    const submitFormSearch = document.getElementById("formSearch");

    submitFormBook.addEventListener("submit", (event) => {
        event.preventDefault();
        getDataFormBook();
    });

    submitFormSearch.addEventListener("submit", (event) => {
        event.preventDefault();
        getSearchBook();
    });

    if(getCheckStroage()) {
        getDataInStorage();
    }
});

document.addEventListener("onSaveDatas", () => {
    console.log("Buku Anda berhasil disimpan.");
});

document.addEventListener("onLoadDatas", () => {
    getRefreshData();
});