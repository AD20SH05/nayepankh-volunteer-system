const API="http://localhost:3000/api/volunteers";

document.getElementById("form")?.addEventListener("submit", async e=>{
e.preventDefault();
await fetch(API+"/register",{method:"POST",headers:{"Content-Type":"application/json"},
body:JSON.stringify({name:name.value,email:email.value,password:password.value})});
alert("Registered");
});

async function login(){
let res=await fetch(API+"/login",{method:"POST",headers:{"Content-Type":"application/json"},
body:JSON.stringify({email:email.value,password:password.value})});
let data=await res.json();
alert("Login success");
}

async function loadData(){
let res=await fetch(API);
let data=await res.json();
let list=document.getElementById("list");
list.innerHTML="";
data.forEach(v=>{
let li=document.createElement("li");
li.textContent=v.name;
list.appendChild(li);
});
}