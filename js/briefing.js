function makeId(){
  return "TT-" + Math.random().toString(16).slice(2,8).toUpperCase() + "-" + Date.now().toString().slice(-4);
}

const form = document.querySelector("form[data-briefing]");
const done = document.getElementById("doneBox");
const order = document.getElementById("orderId");

if(form){
  const id = makeId();
  if(order) order.textContent = id;

  form.addEventListener("submit", (e)=>{
    e.preventDefault();

    const required = form.querySelectorAll("[required]");
    for(const field of required){
      if(!field.value.trim()){
        field.focus();
        alert("Preencha os campos obrigatórios.");
        return;
      }
    }

    const data = Object.fromEntries(new FormData(form).entries());
    data.orderId = id;
    data.createdAt = new Date().toISOString();
    localStorage.setItem("taylortech_last_briefing", JSON.stringify(data));

    form.style.display = "none";
    if(done) done.style.display = "block";
  });
}