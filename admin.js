let result;

async function getDb(){

    let response = await fetch ("https://baza-de-date-project.firebaseio.com/.json");
    result = await response.json();

    drawAdmin();

}

let btn = document.querySelector("#add_btn");

btn.addEventListener('click', function(){
        
    document.querySelector(".bg-modal-admin").classList.remove("hide");
    document.querySelector("#btn2").classList.remove("hide"); //Apare modalul si butonul de save

    document.querySelector("#name_value").value = "";
    document.querySelector("#image_value").value = "";
    document.querySelector("#price_value").value = "";
    document.querySelector("#stock_value").value = "";
    document.querySelector("#description_value").value = "";//Golesc input-urile

    
    let cancel = document.querySelector('#btn3');

    cancel.addEventListener('click', function(){

        document.querySelector(".bg-modal-admin").classList.add("hide");
        document.querySelector("#btn2").classList.add("hide");

    })

});

let save = document.querySelector('#btn2');

save.addEventListener('click',function(){

    const promise = saveProduct();

    promise.then(function(){
        document.querySelector(".bg-modal-admin").classList.add("hide");
        document.querySelector("#btn2").classList.add("hide");
        getDb();
    })
})

async function modify(event){
    
    document.querySelector(".bg-modal-admin").classList.remove("hide");
    document.querySelector("#btn4").classList.remove("hide"); //Apar modulul si butonul modify

    let id = event.target.dataset.id;
    let response = await fetch ("https://baza-de-date-project.firebaseio.com/.json");
    result = await response.json();

    document.querySelector("#name_value").value = result[id].name; // Inputurile primesc valorile de modificat 
    document.querySelector("#image_value").value = result[id].image;
    document.querySelector("#price_value").value = result[id].price;
    document.querySelector("#stock_value").value = result[id].stock;
    document.querySelector("#description_value").value = result[id].about;

    let cancel = document.querySelector('#btn3');

    cancel.addEventListener('click', function(){
        document.querySelector(".bg-modal-admin").classList.add("hide");
        document.querySelector("#btn4").classList.add("hide");
    })

        
    let modify = document.querySelector("#btn4");

    modify.addEventListener('click',async function(){

        let modifiedItem = {
            name : document.querySelector("#name_value").value,
            image : document.querySelector("#image_value").value,
            price : document.querySelector("#price_value").value,
            stock : document.querySelector("#stock_value").value,
            about : document.querySelector("#description_value").value
        }

        let modify = await fetch(`https://baza-de-date-project.firebaseio.com/${id}.json`, {

            method : "PUT",
            body : JSON.stringify(modifiedItem)

        })

        document.querySelector(".bg-modal-admin").classList.add("hide");
        document.querySelector("#btn4").classList.add("hide");
        getDb();

    })

}

async function saveProduct(){ //Adauga noul produs in baza de date
    
   return fetch("https://baza-de-date-project.firebaseio.com/.json", {

    method : "POST",
    body :JSON.stringify({
        image: document.getElementById("image_value").value,
        name : document.getElementById("name_value").value,
        about: document.getElementById("description_value").value,
        price: document.getElementById("price_value").value,
        stock: document.getElementById("stock_value").value,
    })
    })

    .then(res =>{return res.json()} )
    .then(data => data)
}

function drawAdmin(){
    
    let str = "";

    for(let i in result){

        str += `

            <a href="detalii.html?idItem=1" id="item">
                <tr class="list_row">

                    <td class="row_data">
                        <img src="${result[i].image}" class="row_img" alt="imagine">
                    </td>

                    <td class="row_data">
                        <p>${result[i].name}</p>
                    </td>

                    <td class="row_data">
                        <p>${result[i].price}</p>
                    </td>

                    <td class="row_data">
                        <p>${result[i].stock}</p>
                    </td>

                    <td class="row_data">
                        <button data-id="${i}" class="mdf" onclick="modify(event)">Modify</button>
                    </td>

                    <td class="row_data">
                        <button data-id="${i}" onclick="erase(event)">Remove</button>
                    </td>
                    
                </tr>
            </a>

        `

    }

    document.querySelector(".item_list").innerHTML = str;
}

function drawSearch(){

    let input = document.querySelector(".showDesktop input").value;
    window.location = "index.html?id="+input;
    document.querySelector(".showDesktop input").value = "";
    return;

}

async function erase(event){

    event.target.parentNode.parentNode.remove();
    let id = event.target.dataset.id;

    let response = await fetch ("https://baza-de-date-project.firebaseio.com/.json");
    result = await response.json();

    for(let i in result){

        let product = result[i];

        if(product === null){
            continue
        }

        if(i === id){

          let deleteResponse = await fetch(`https://baza-de-date-project.firebaseio.com/${id}.json`,
          {method : "DELETE"});

        }

    }

}
