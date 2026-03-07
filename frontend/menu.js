const vegItems = [
 {name:"Samosa",img:"https://images.unsplash.com/photo-1601050690597-df0568f70950"},
 {name:"Aloo Tikki",img:"https://images.unsplash.com/photo-1604908176997-4316b7b6d0d5"},
 {name:"Paneer Tikka",img:"https://images.unsplash.com/photo-1603894584373-5ac82b2ae398"},
 {name:"Pakoras",img:"https://images.unsplash.com/photo-1631452180519-c014fe946bc7"},
 {name:"Dhokla",img:"https://images.unsplash.com/photo-1666001079503-96a4b76b1c14"},
 {name:"Bhel Puri",img:"https://images.unsplash.com/photo-1668236543090-82eba5e7d94e"},
 {name:"Garlic Bread",img:"https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab"},
 {name:"Veg Spring Rolls",img:"https://images.unsplash.com/photo-1604908177522-402c2c6e8b7f"}
];

const nonVegItems = [
 {name:"Butter Chicken",img:"https://images.unsplash.com/photo-1604908554021-95d8f8c7dba5"},
 {name:"Chicken Biryani",img:"https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a"},
 {name:"Fish Curry",img:"https://images.unsplash.com/photo-1625944525533-473f1d5e2c19"},
 {name:"Chicken Tandoori",img:"https://images.unsplash.com/photo-1601050690117-8b3ca5f5a1c1"},
 {name:"Mutton Rogan Josh",img:"https://images.unsplash.com/photo-1603894584373-5ac82b2ae398"}
];

const cart=[];

function renderItems(items,container){

items.forEach(item=>{

const card=document.createElement("div");
card.className="menu-card";

card.innerHTML=`
<img src="${item.img}" width="150">
<h3>${item.name}</h3>
<button>Add to Cart</button>
`;

card.querySelector("button").onclick=()=>{
 cart.push(item.name);
 updateCart();
};

container.appendChild(card);

});
}

renderItems(vegItems,document.getElementById("veg"));
renderItems(nonVegItems,document.getElementById("nonveg"));

function updateCart(){

const list=document.getElementById("cart");
list.innerHTML="";

cart.forEach(item=>{
 const li=document.createElement("li");
 li.innerText=item;
 list.appendChild(li);
});

}

async function placeOrder(){

const token=localStorage.getItem("token");

await fetch('/submit-order',{
 method:'POST',
 headers:{
   'Content-Type':'application/json',
   'Authorization':token
 },
 body:JSON.stringify({items:cart})
});

alert("Order placed!");

}