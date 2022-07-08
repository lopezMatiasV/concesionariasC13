const qs = (selector) => document.querySelector(selector);

window.addEventListener('load', function() {
    let register = qs('#register')
    let nombre = qs('#nombre')
    let apellido = qs('#apellido')
    let email = qs('#email')
    let pass = qs('#pass')
    let regExEmail =  /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;
    let regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;
    let errores;

    nombre.addEventListener('blur', ()=> {
        switch (true) {
            case nombre.value.length == 0:
                errorNombre.innerHTML = 'Campo requerido';
                nombre.classList.add('is-invalid');
                errores = true
                break;
            case nombre.value.length <= 2 :
                errorNombre.innerHTML = 'minimo 3 caracteres';
                nombre.classList.add('is-invalid');
                errores = true;
                break;
            default:
                nombre.classList.remove('is-invalid');
                nombre.classList.add('is-valid');
                errorNombre.innerHTML = "";
                errores = false
                break;
        }
        
    })
    apellido.addEventListener('blur', ()=> {
        switch (true) {
            case apellido.value.length == 0:
                errorApellido.innerHTML = 'Campo requerido';
                apellido.classList.add('is-invalid');
                break;
            case apellido.value.length <= 2 :
                errorApellido.innerHTML = 'minimo 3 caracteres';
                apellido.classList.add('is-invalid');
                break;
            default:
                apellido.classList.remove('is-invalid');
                apellido.classList.add('is-valid');
                errorApellido.innerHTML = "";
                break;
        }
        
    })
    email.addEventListener('blur', () =>{
        switch (true) {
            case email.value.length == 0:
                errorEmail.innerHTML = "El campo email es obligatorio";
                email.classList.add('is-invalid');
                errores = true;
                break;
            case !regExEmail.test(email.value):
                errorEmail.innerHTML = "Debes escribir un mail válido";
                email.classList.add('is-invalid');
                errores = true;
                break;
            default:
                email.classList.remove('is-invalid');
                email.classList.add('is-valid');
                errorEmail.innerHTML = "";
                errores = false
                break;
        }
    })
    email.addEventListener('blur', () => {
        fetch('http://localhost:3000/apis/usuarios')
        .then(response => response.json())
        .then(result => {
            result.data.forEach(element => {
                if(email.value === element.email){
                    errorEmail.innerHTML = "email ya registrado";
                    email.classList.add('is-invalid');
                    errores = true;
                }
            });
        })
    })
    pass.addEventListener('blur', () => {
        switch (true) {
            case pass.value.length == "":
                errorPass.innerHTML = "El campo contraseña es obligatorio";
                pass.classList.add('is-invalid');
                errores = true;
                break;
            case !regExPass.test(pass.value):
                errorPass.innerHTML = "La contraseña debe tener: entre 6 y 12 caracteres, al menos 1 mayúscula, una minúscula y un número";
                pass.classList.add('is-invalid');
                errores = true;
                break;
            default:
                pass.classList.remove('is-invalid');
                pass.classList.add('is-valid');
                errorPass.innerHTML = "";
                errores = false;
                break; 
        }
    })
    pass2.addEventListener('blur', () => {
        switch (true) {
            case pass2.value.length == "":
                errorPass2.innerHTML = "El campo contraseña es obligatorio";
                pass2.classList.add('is-invalid');
                errores = true;
                break;
            case pass2.value != pass.value:
                errorPass2.innerHTML = "Las contraseñas no coinciden";
                pass2.classList.add('is-invalid');
                errores = true;
                break;
            default:
                pass2.classList.remove('is-invalid');
                pass2.classList.add('is-valid');
                errorPass2.innerHTML = "";
                errores = false;
                break; 
        }
    })
    pass.addEventListener('change', () => {
        switch (true) {
            case pass.value != pass2.value:
                errorPass2.innerHTML = "Las contraseñas no coinciden";
                pass2.classList.add('is-invalid');
                errores = true;
                break;
            default:
                pass2.classList.remove('is-invalid');
                pass2.classList.add('is-valid');
                errorPass2.innerHTML = "";
                errores = false;
                break;
        }
    })
    register.addEventListener('submit',(event) => {
        let errores = true;
        event.preventDefault()
    
        let elementosForm = register.elements
        
        for (let i = 0; i < elementosForm.length-1; i++) {
            if(elementosForm[i].value === ""  || elementosForm[i].classList.contains('is-invalid')){
                elementosForm[i].classList.add('is-invalid');
                errorForm.innerHTML = "Revisa los campos señalados";
                errores = true;
            }else{
                errores = false;
            }
        }
        if(errores == false){
            console.log("Todo Perfecto!!");
            errorForm.innerHTML = '';
            alert("Te registraste correctamente");
            register.submit();
        }
    })
})