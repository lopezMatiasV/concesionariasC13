let qs = (selector) => document.querySelector(selector)

window.addEventListener('load', () => {
    let $login = qs('#login'),
        $email = qs('#email'),
        $pass = qs('#pass'),
        $errorEmail = qs('#errorEmail'),
        $errorPass = qs('#errorPass'),
        regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/,
        regExEmail = /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/,
        errores;
    $email.addEventListener('blur', () => {
        switch (true) {
            case $email.value.length == 0:
                $errorEmail.innerHTML = 'el campo es obligarorio'
                $email.classList.add('is-invalid')
                errores = true
                break;
            case !regExEmail.test($email.value):
                $errorEmail.innerHTML = 'debes escribir un mail valido'
                $email.classList.add('is-invalid')
                errores = true
                break;
            default:
                $email.classList.remove('is-invalid')
                $email.classList.add('is-valid')
                $errorEmail.innerHTML = ''
                errores = false
                break;
        }
    })
    $pass.addEventListener('blur', () => {
        switch (true) {
            case $pass.value.length == 0:
                $errorPass.innerHTML = 'el campo es obligarorio'
                $pass.classList.add('is-invalid')
                errores = true
                break;
            case !regExPass.test($pass.value):
                $errorPass.innerHTML = 'debes escribir un Password valido'
                $pass.classList.add('is-invalid')
                errores = true
                break;
            default:
                $pass.classList.remove('is-invalid')
                $pass.classList.add('is-valid')
                $errorPass.innerHTML = ''
                errores = false
                break;
        }
    })
    $login.addEventListener('submit', (event) => {
        event.preventDefault()
        switch (true) {
            case $email.value.length == 0:
                $errorEmail.innerHTML = 'el campo es obligatorio'
                $email.classList.add('is-invalid')
                errores = true
                break;
            case !regExEmail.test($email.value):
                $errorEmail.innerHTML = 'debes escribir un mail valido'
                $email.classList.add('is-invalid')
                errores = true
                break;
            case $pass.value.length == 0:
                $errorPass.innerHTML = 'el campo es obligarorio'
                $pass.classList.add('is-invalid')
                errores = true
                break;
            case !regExPass.test($pass.value):
                $errorPass.innerHTML = 'debes escribir un Password valido'
                $pass.classList.add('is-invalid')
                errores = true
                break;
            default:
                if(!errores){
                    $login.submit()
                    errores = false
                }else{
                    errores = true
                }
            break;
        }
    })
})