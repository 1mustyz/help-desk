console.log('it works')

const regName = document.querySelector('.reg-name')
const regEmail = document.querySelector('.reg-email')
const regPass = document.querySelector('.reg-pass')
const conPass = document.querySelector('.reg-Cpass')
const regSubmit = document.querySelector('.reg-submit')
const submitText = document.querySelector('.submit-text')
const submitLoader = document.querySelector('.lds-ellipsis')
const logPass = document.querySelector('.log-pass')
const logEmail = document.querySelector('.log-email')
const logSubmit = document.querySelector('.log-submit')

console.log(regEmail)


function updateMessage(value){
    alert(value)
}

regSubmit.addEventListener('click', (e) => {
    e.preventDefault();

    let data = {
        fullName: regName.value,
        username: regEmail.value,
        password: regPass.value
    }
    // let data = {
    //     fullName: "jsj",
    //     username: "h@gmail.com",
    //     password: "1"
    // }

    if(regName.value == "") updateMessage("Name field is empty")
    else if(regEmail.value == "") updateMessage("email is empty")
    else if(regPass.value == "")updateMessage("Password is empty")
    else if(conPass.value == "") updateMessage("Confirm Password is empty")
    else if(regPass.value != conPass.value)updateMessage("Password and Confirm Password did not Match")
    else{
        console.log(data)

    submitText.classList.add('load')
    submitLoader.classList.remove('load')
    regSubmit.disabled = true
    regSubmit.classList.add('submit-load')

    fetch('https://gift-work.herokuapp.com/admin/register-staff', {
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
            regName.value = ''
            regEmail.value = ''
            regPass.value = ''
            conPass.value = ''
            updateMessage("User created sucessfully")

        } 
        else updateMessage("Email or password is incorrect")

        submitText.classList.remove('load')
        submitLoader.classList.add('load')
        regSubmit.disabled = false
        regSubmit.classList.remove('submit-load')
        
        })
        .catch((error) => {
        console.log( error);
        });

    }



    });

logSubmit.addEventListener('click', (e) => {
    e.preventDefault()

    let data = {
        username: logEmail.value,
        password: logPass.value
    }

    if(logEmail.value == "") updateMessage("email is empty")
    else if(logPass.value == "")updateMessage("Password is empty")
    else{
        console.log(data)

    submitText.classList.add('load')
    submitLoader.classList.remove('load')
    logSubmit.disabled = true
    logSubmit.classList.add('submit-load')

    fetch('https://gift-work.herokuapp.com/admin/login', {
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
        console.log(window.location.origin+'/Templates/UserDashboard.html')

        if(data.success == true){
            logEmail.value = ''
            logPass.value = ''
            window.location.href = window.location.origin+'/Templates/UserDashboard.html'
            // updateMessage("User created sucessfully")

        } 
        else updateMessage("Email or password is incorrect")

        submitText.classList.remove('load')
        submitLoader.classList.add('load')
        logSubmit.disabled = false
        logSubmit.classList.remove('submit-load')
        
        })
        .catch((error) => {
        console.log( error);
        });

    }



})