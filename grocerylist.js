//sellect items
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const submitBtn = document.querySelector('.submit-btn');
const grocery = document.getElementById('grocery');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

//edit options
let editElement;
let editFlag = false;
let editID = "";

// console.log(typeof(editFlag))

// set up eventListeners for submit form
form.addEventListener('submit',addItem)
//clear items
clearBtn.addEventListener('click',clearItems)
//deletebtn 
// const deleteBtn = document.querySelector('.delete-btn');
//function
function addItem(e){
    e.preventDefault() //prevents default behaviour of the form when submiting.
    // console.log(grocery.value)
    const value = grocery.value  // acessing the value targeted from the input
    const id = new Date().getTime().toString()
    // if(value !== '' && editFlag === false){}
    // else if(value !== '' && editFlag === true){}
    // else{}
    if(value && !editFlag){ //if the value is true and the editflag is false
        const element = document.createElement('article')
        // console.log('add item to the list')
          //adding a class
          element.classList.add('grocery-item');
            //add id
        const attr = document.createAttribute('data-id');
          attr.value = id
         element.setAttributeNode(attr)
 //add the html
         element.innerHTML = `<p class="title">${value}</p>
         <div class="btn-container">
             <button type="button" class="edit-btn">
 <i class="fas fa-edit"></i>
             </button>
             <button type="button" class="delete-btn">
                 <i class="fas fa-trash"></i>
                              </button>            
         </div>`;
         const deleteBtn = element.querySelector('.delete-btn');
         const editBtn = element.querySelector('.edit-btn');
         deleteBtn.addEventListener('click',deleteItem)
         editBtn.addEventListener('click',editItem)
         //append child
         list.appendChild(element)
         //display alert
         displayAlert('item added to the list', 'success');
         //show my container
         container.classList.add('show-container')
         //add to local storage
        //  addToLocalStorage(id,value);
         //set back to default
         setBackToDefault();
    }
    else if(value && editFlag){ // if the value is true & editflag is true
        editElement.innerHTML = value;
        displayAlert('value changed','success');
        setBackToDefault();

        //edit local storage
        editLocalStorage(editID,value)
        setBackToDefault();
        // console.log('editing')
    }
    else{
        displayAlert("please enter value", "danger")
    }
}
 
//a function for display alert with two arguments
function displayAlert(text,action){
    alert.textContent = text;
    alert.classList.add(`alert-${action}`); //this is a template string

    //remove alert with setTimeOut function by one second
    setTimeout(function(){
        alert.textContent = '';
        alert.classList.remove(`alert-${action}`);
    },1000)
}
//clear items functions
function clearItems(){
    const items = document.querySelectorAll('.grocery-item');

    if(items.length > 0){ // iif the item is greater than zero
        //iterate over the items with foreach method
        items.forEach(function(item){
            list.removeChild(item); // removing child from the parent div grocery-list
        });
    }
    container.classList.remove('show-container'); //reove the class of show-container
    displayAlert('empty list', 'warning');// displays the alert of the cleared list
    setBackToDefault();  // set back to default
    //localStorage.removeItem('list');
}
//delete funtion
function deleteItem(e){
    const element = e.currentTarget.parentElement.parentElement;// tageting G-item
    const id = element.dataset.id
    list.removeChild(element);//remove item from the list
    if(list.children.length === 0){
    container.classList.remove('show-container')
    }
    displayAlert('item revoved','danger')
    setBackToDefault();
//remove from local storage
// removeFromLocalStorage(id);
    // console.log('item deleted') 
}
//edit function
function editItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    //SET EDIT ITEM 
editElement = e.currentTarget.parentElement.previousElementSibling;  //the pE trgt btn cntnr
//set form value
grocery.value = editElement.innerHTML // targets a specific value 
editFlag = true;
editID = element.dataset.id; 
submitBtn.textContent = 'edit';                     
//  console.log('edit item')   
}
//set back to default
function setBackToDefault(){
    grocery.value = ''; //When a value is entered it will set back to an empty strng
    editFlag = false;
    editID = '';
    submitBtn.textContent = 'submit'

    // console.log('set back to default')  
}
//local storage
function addToLocalStorage(id,value){
    const grocery = {id,value};
    // console.log(grocery)
let items = localStorage();
items.push(grocery);
localStorage.setItem('list', JSON.stringify(items));
// console.log(items)
}
function removeFromLocalStorage(id){}
function editLocalStorage(id, value){}
function getLocalStorage(){}
