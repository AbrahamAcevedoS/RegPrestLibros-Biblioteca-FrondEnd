const limpiar = () => {
    document.querySelector('form').reset()
    document.querySelectorAll('.form-control').forEach(item => {
        item.classList.remove('is-invalid')
        item.classList.remove('is-valid')
        document.getElementById('e-' + item.name).innerHTML = ''
    })
    //volver a la normalidad run y btnGuardar
    document.getElementById('run').readOnly = false
    document.getElementById('btnGuardar').value = 'Guardar'
}


const soloNumeros = (evt) => {
    if (evt.keyCode >= 48 && evt.keyCode <= 57)
        return true
    return false
}
const verificar = (id) => {
    //captura el input de cual estamos enviando el id
    const input = document.getElementById(id)
    //captura el div error de cada input 
    const div = document.getElementById('e-' + id)
    input.classList.remove('is-invalid')
    //verifica si el campo esta vacío 
    if (input.value.trim() == '') {
        //classList tiene la propiedad add y remove. add permite añadir un estilo, remove quitarlo
        input.classList.add('is-invalid')
        //innerHTML permite agregar nuevos elementos html desde js
        div.innerHTML = '<span class="badge bg-danger">El campo es obligatorio</span>'
    }
    
    if (id == 'fechaPrestamo') {
        const fecha_prest = new Date(input.value)
        const hoy = new Date()
        if (fecha_prest > hoy) {
            input.classList.add('is-invalid')
            div.innerHTML = '<span class="badge bg-danger">La fecha ingresada es mayor al dia de hoy</span>'
            }
    }
    if (id == 'run') {
        //! verifica que sea false 
        if (!validaRun(input.value) /*|| input.value.length < 9*/) { //length cuenta la cantidad de letras
            input.classList.add('is-invalid')
            div.innerHTML = '<span class="badge bg-danger">El run no es válido</span>'
            }
    }
    if (id == 'email') {
        if (!validaEmail(input.value)) {
            input.classList.add('is-invalid')
            div.innerHTML = '<span class="badge bg-danger">El email no tiene el formato correcto</span>'
            }
    }
    }


const validaEmail = (email) => {
    const formato = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
    if (!formato.test(email))
        return false
    return true
}

const validaRun = (run) => {
    const Fn = {
        // Valida el rut con su cadena completa "XXXXXXXX-X" 17744273-9
        validaRut: function (rutCompleto) {
            rutCompleto = rutCompleto.replace("‐", "-")
            if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
                return false
            const tmp = rutCompleto.split('-') //split separa en run en dos antes del guión y despues
            const digv = tmp[1] //dígito verificador
            const rut = tmp[0]//parte númerica
            if (digv == 'K') digv = 'k'

            return (Fn.dv(rut) == digv)
        },
        dv: function (T) {
            let M = 0, S = 1
            for (; T; T = Math.floor(T / 10))
                S = (S + T % 10 * (9 - M++ % 6)) % 11
            return S ? S - 1 : 'k'
        }
    }
    return Fn.validaRut(run)
}
