console.log('it works')

const conName = document.querySelector('.con-name')
const conEmail = document.querySelector('.con-email')
const conMsg = document.querySelector('.con-msg')
const conSubmit = document.querySelector('.con-submit')
const submitText = document.querySelector('.submit-text')
const submitLoader = document.querySelector('.lds-ellipsis')


console.log(conEmail)


function updateMessage(value){
    alert(value)
}

conSubmit.addEventListener('click', (e) => {
    e.preventDefault();

    let data = {
        fullName: conName.value,
        email: conEmail.value,
        message: conMsg.value
    }
    // let data = {
    //     fullName: 'Yusuf',
    //     email: 'y@gmail.com',
    //     message: 'Hello'
    // }

    if(conName.value == "") updateMessage("Name field is empty")
    else if(conEmail.value == "") updateMessage("email is empty")
    else if(conMsg.value == "")updateMessage("Password is empty")
    else{
        console.log(data)

    submitText.classList.add('load')
    submitLoader.classList.remove('load')
    conSubmit.disabled = true
    conSubmit.classList.add('submit-load')

    fetch('https://gift-work.herokuapp.com/admin/create-complain', {
        method: 'POST', // or 'PUT'
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin': 'https://gift-work.herokuapp.com'
        },
        body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);

        if(data.success == true){
            updateMessage("Your Complain is recieved")

            submitText.classList.remove('load')
            submitLoader.classList.add('load')
            conSubmit.disabled = false
            conSubmit.classList.remove('submit-load')

            conName.value = ''
            conEmail.value = ''
            conMsg.value = ''

        } 
        
        })
        .catch((error) => {
        console.log( error);
        });

    }



    });

