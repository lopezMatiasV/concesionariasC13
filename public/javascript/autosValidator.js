let qs = (selector) => document.querySelector(selector)

window.addEventListener('load', () => {
    let form = qs('form'),
        marca = qs('#marca'),
        modelo = qs('#modelo'),
        anio = qs('#anio'),
        color = qs('#color'),
        sucursal = qs('#sucursal'),
        imagen = qs('#inputFile'),
        regExExtensions = /(.jpg|.jpeg|.png|.gif)$/i;

    marca.addEventListener('blur', () => {
        switch (true) {
            case marca.value.length == 0:
                marca.classList.add('is-invalid');
                errorMarca.innerHTML = 'Campo requerido';
                errores = true
                break;
            case marca.value.length <= 2:
                marca.classList.add('is-invalid');
                errorMarca.innerHTML = 'Campo requerido';
                errores = true
                break;
            default:
                marca.classList.remove('is-invalid');
                marca.classList.add('is-valid');
                errorMarca.innerHTML = "";
                errores = false
                break;
        }
    })
    modelo.addEventListener('blur', () => {
        switch (true) {
            case modelo.value.length == 0:
                modelo.classList.add('is-invalid');
                errorModelo.innerHTML = 'Campo requerido';
                errores = true
                break;
            case modelo.value.length < 2:
                modelo.classList.add('is-invalid');
                errorModelo.innerHTML = 'Campo requerido';
                errores = true
                break;
            default:
                modelo.classList.remove('is-invalid');
                modelo.classList.add('is-valid');
                errorModelo.innerHTML = "";
                errores = false
                break;
        }
    })
    anio.addEventListener('blur', () => {
        switch (true) {
            case anio.value.length == 0:
                anio.classList.add('is-invalid');
                errorAnio.innerHTML = 'Campo requerido';
                errores = true
                break;
            case anio.value.length < 4:
                anio.classList.add('is-invalid');
                errorAnio.innerHTML = 'Campo requerido';
                errores = true
                break;
            default:
                anio.classList.remove('is-invalid');
                anio.classList.add('is-valid');
                errorAnio.innerHTML = "";
                errores = false
                break;
        }
    })
    color.addEventListener('blur', () => {
        switch (true) {
            case color.value.length == 0:
                color.classList.add('is-invalid');
                errorColor.innerHTML = 'Campo requerido';
                errores = true
                break;
            default:
                color.classList.remove('is-invalid');
                color.classList.add('is-valid');
                errorColor.innerHTML = "";
                errores = false
                break;
        }
    })
    sucursal.addEventListener('blur', () => {
        switch (true) {
            case sucursal.value.length == '':
                sucursal.classList.add('is-invalid');
                errorSucursal.innerHTML = 'Campo requerido';
                errores = true
                break;
            default:
                sucursal.classList.remove('is-invalid');
                sucursal.classList.add('is-valid');
                errorSucursal.innerHTML = "";
                errores = false
                break;
        }
    })
    imagen.addEventListener('change', () => {
        if(!regExExtensions.exec(imagen.value)){
            imagen.value = '';
            imagen.classList.add('is-invalid');
            errorImagen.innerHTML = 'Archivo no soportado';
            errores = true
        }else{
            imagen.classList.remove('is-invalid');
            imagen.classList.add('is-valid');
            errorImagen.innerHTML = '';
            errores = false;
        }
    })
    form.addEventListener('submit', (e) =>{
        let errores = true;
        e.preventDefault()
        let elementosForm = form.elements
        
        for (let i = 0; i < elementosForm.length-1; i++) {
            if(elementosForm[i].value === "" || elementosForm[i].classList.contains('is-invalid')){
                elementosForm[i].classList.add('is-invalid');
                errorForm.innerHTML = "Revisa los campos señalados";
                errores = true;
            }else{
                errores = false;
            }
        }
        if(sucursal.value.length === 0){
            errores = true
        }
        if(errores == false){
            console.log("Todo Perfecto!!");
            errorForm.innerHTML = '';
            alert("Carga realizada correctamente");
            form.submit();
        }
    })
})