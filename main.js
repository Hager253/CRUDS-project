let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes= document.getElementById('taxes');

let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');

let count = document.getElementById('count');
let category = document.getElementById('category');
let submit= document.getElementById('submit');
let mood ='create';
let tmp;
//console.log(title ,price,taxes,ads,discount,total,count,category,submit);

function GetTotal(){
   // console.log('done');
   if(price.value != ''){
        let Result =( +price.value + +taxes.value + +ads.value)
         - +discount.value ;
         total.innerHTML= Result;
         total.style.background ="#040";

    }
    else{
        total.innerHTML ='';
        total.style.background ="cornflowerblue";
    }
    
}

let Product =[] ;

if(localStorage.pro !=null){
    Product = JSON.parse(localStorage.pro);
}
else{
    Product=[];
}
function create(){


    let newProduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
         ads:  ads.value,
         discount:discount.value,
         total: total.innerHTML,
         count:count.value,
         category:category.value.toLowerCase(),
    }
   // console.log(newProduct);
   if(title.value != ''&& price.value !='' && category.value !=''
   && newProduct.count<100
    ){
   if(mood==='create'){
   if(newProduct.count>1){
    for(let i = 0;i<newProduct.count;i++){
        Product.push(newProduct);

   }}else{
    Product.push(newProduct);
   }}else{
    Product[tmp] = newProduct;
mood='create';
submit.innerHTML = 'Create';
count.style.display = 'block';
   
}
clear();

}





  // console.log(Product);
  localStorage.setItem('pro',JSON.stringify(Product));
  ShowData();

}


function clear(){
    title.value ='';
    price.value ='';
     taxes.value ='';
     ads.value ='';
     discount.value ='';
     total.innerHTML ='';
     count.value ='';
     category.value ='';


}
function ShowData(){
    let table ='';
    for(let i = 0;i < Product.length;i++){
        table += `
        <tr>
        <td>${i+1}</td>
        <td>${Product[i].title}</td>
        <td>${Product[i].price}</td>
        <td>${Product[i].taxes}</td>
        <td>${Product[i].ads}</td>
        <td>${Product[i].discount}</td>
        <td>${Product[i].total}</td>
        <td>${Product[i].category}</td>
        <td><button onclick="Update(${i})" id="update"></button></td>
        <td><button  onclick="Delete(${i})" id="delete"></button></td>

    </tr>  `

        //console.log(table);
    }
   document.getElementById('tbody').innerHTML= table;

   let Dele = document.getElementById("del");
   if (Product.length>0){
 Dele.innerHTML =`
 <button onclick= "DeleteAll()" >Delete All(${Product.length})</button>
 
 `}else{
    Dele.innerHTML ="";
    }
 GetTotal();
}

function Delete(i){



Product.splice(i,1);
localStorage.pro = JSON.stringify(Product);
ShowData();

}

   function DeleteAll(){
    localStorage.clear();
    Product.splice(0);
    ShowData();
   }

function Update(i){
   // console.log(i);
   title.value = Product[i].title;
   price.value = Product[i].price;
   taxes.value = Product[i].taxes;
   ads.value = Product[i].ads;
   discount.value =Product[i].discount;
   GetTotal();
   count.style.display ="none";
   category.value = Product[i].category;
   submit.innerHTML = "Update";
   mood = 'update';
   tmp = i;
   scroll({
    top:0,
    behavior:"smooth"
})


}

let SearchMood = 'title' ;
function Mood (id){
   // console.log(id);
   let search = document.getElementById("search");
   if(id == 'SearchTitle'){
    SearchMood = 'title';
   }else{
    SearchMood = 'category';
    

   }  
     search.placeholder = 'search by '+ SearchMood;

  // console.log( SearchMood );
  search.focus();
  search.value = "";
  ShowData();
}
 function Search (value){
      // console.log( value );
      let table ='';
      for(let i = 0; i<Product.length;i++){

      if(SearchMood =='title'){
            if(Product[i].title.includes(value.toLowerCase())){
//console.log(i);
             table += `
                <tr>
                <td>${i+1}</td>
                <td>${Product[i].title}</td>
                <td>${Product[i].price}</td>
                <td>${Product[i].taxes}</td>
                <td>${Product[i].ads}</td>
                <td>${Product[i].discount}</td>
                <td>${Product[i].total}</td>
                <td>${Product[i].category}</td>
                <td><button onclick="Update(${i})" id="update"></button></td>
                <td><button  onclick="Delete(${i})" id="delete"></button></td>
            </tr>  `;
        
        
            document.getElementById('tbody').innerHTML= table;



            }
        }
      else{


            if(Product[i].category.includes(value.toLowerCase())){

                table += `
                <tr>
                <td>${i+1}</td>
                <td>${Product[i].title}</td>
                <td>${Product[i].price}</td>
                <td>${Product[i].taxes}</td>
                <td>${Product[i].ads}</td>
                <td>${Product[i].discount}</td>
                <td>${Product[i].total}</td>
                <td>${Product[i].category}</td>
                <td><button onclick="Update(${i})" id="update"></button></td>
                <td><button  onclick="Delete(${i})" id="delete"></button></td>
            </tr>  `;
        
            document.getElementById('tbody').innerHTML= table;

            
            }
        }

      }
    }
    