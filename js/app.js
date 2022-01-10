 console.log("Welcome to notes app. This is app.js");
 showNotes();

 // If user adds a note, add it to the localStorage
 let addBtn = document.getElementById("addBtn");
 addBtn.addEventListener("click", function (e) {
     let addTxt = document.getElementById("addTxt");
     let addTxttopic = document.getElementById("addTxttopic");
     let notes = localStorage.getItem("notes");
     if (notes == null) {
         notesObj = [];
     } else {
         notesObj = JSON.parse(notes);
     }
     notesObj.push(addTxt.value.toUpperCase(), addTxttopic.value);
     if (addTxt.value != "" && addTxttopic.value!="") {
       localStorage.setItem("notes", JSON.stringify(notesObj));
     }
     addTxt.value = "";
    addTxttopic.value="";
     //   console.log(notesObj);
     showNotes();
 });
var dayName =['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var day = dayName[new Date().getDay()];
var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = today.getFullYear();
today = mm + "/" + dd + "/" + yyyy;
var date_format = "12";
var d = new Date();
var hour = d.getHours(); 
var minutes = d.getMinutes();
var result = hour;
var ext = "";
if(date_format == '12'){
    if(hour > 12){
        ext = 'PM';
        hour = (hour - 12);
        result = hour;

        if(hour < 10){
            result = "0" + hour;
        }else if(hour == 12){
            hour = "00";
            ext = 'AM';
        }
    }
    else if(hour < 12){
        result = ((hour < 10) ? "0" + hour : hour);
        ext = 'AM';
    }else if(hour == 12){
        ext = 'PM';
    }
}
 
if(minutes < 10){
    minutes = "0" + minutes; 
}
 
result = result + ":" + minutes + ' ' + ext; 
 

 // Function to show elements from localStorage
 function showNotes() {
     let notes = localStorage.getItem("notes");
     if (notes == null) {
         notesObj = [];
     } else {
         notesObj = JSON.parse(notes);
     }
     let html = " ";
     for (let index = 0; index < notesObj.length; index++) {
         const subject = notesObj[index];
         const topic = notesObj[index+1];
         if(index%2==0){
         html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                <h5 class="card-title">${(index + 1) / 2 + 0.5} : ${subject}</h5>
                <p class="card-text"> ${topic}</p>
                <p class="card-text"> ${day}-${today}-${result}</p>
                    <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Topic</button>
                </div>
            </div>`;
     }};

     let notesElm = document.getElementById("notes");
     if (notesObj.length != 0) {
         notesElm.innerHTML = html;
     } else {
         notesElm.innerHTML = `Nothing to show! Use "Add a Topic" section above to Add Topic.`;
     }
 }

 // Function to delete a note
 function deleteNote(index) {
     //   console.log("I am deleting", index);

     let notes = localStorage.getItem("notes");
     if (notes == null) {
         notesObj = [];
     } else {
         notesObj = JSON.parse(notes);
     }

     notesObj.splice(index, 2);
     localStorage.setItem("notes", JSON.stringify(notesObj));
     showNotes();
 }


 let search = document.getElementById('searchTxt');
 search.addEventListener("input", function () {

     let inputVal = search.value.toLowerCase();
     let inputValupper = search.value.toUpperCase();
     // console.log('Input event fired!', inputVal);
     let noteCards = document.getElementsByClassName('noteCard');
     Array.from(noteCards).forEach(function (element) {
         let cardTxt = element.getElementsByTagName("p")[0].innerText;
         if (cardTxt.includes(inputVal) || cardTxt.includes(inputValupper)) {
           element.style.display = "block";
         } else {
           element.style.display = "none";
         }
         // console.log(cardTxt);
     })
 })

 /*
 Further Features:
 1. Add Title
 2. Mark a note as Important
 3. Separate notes by user
 4. Sync and host to web server 
 */