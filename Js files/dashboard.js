console.log('it works')
const allCard = document.querySelector('.cards')
allCard.innerHTML = ''
console.log(allCard.innerHTML)

fetch('https://gift-work.herokuapp.com/admin/get-all-complain')
  .then(response => response.json())
  .then(data => {
    console.log(data)
    if (data.success == false){
      allCard.innerHTML += `
      <div class="card card-1">
      <div class="card__icon">Complains</i></div>
      <p class="card__exit"><i class="fas fa-times"></i></p>
      <h2 class="card__title">No Comlains Yet</h2>
      
    </div>
  `
    }else{
     data.message.map((msg,index)=>{
   
      allCard.innerHTML += `
      <div class="card card-${index +1}">
      <div class="card__icon">${msg.fullName}</i></div>
      <p class="card__exit"><i class="fas fa-times"></i></p>
      <h2 class="card__title">${msg.message}</h2>
      <p class="card__apply">
        <a class="card__link" href="#">${msg.email}</a>
      </p>
    </div>
  `
    })
  }

  });

