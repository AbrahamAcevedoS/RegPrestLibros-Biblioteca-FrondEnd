import { edit, getData, remove, save, selectOne } from "./firestore.js"
//variable que contiene el id del documento 
let id = 0
//addEventListener permite ejecutar la función cuando se haga click 
document.getElementById('btnGuardar').addEventListener('click', () => {
    document.querySelectorAll('.form-control').forEach(item => {
        verificar(item.id)
    })
    //verificar si existen estilos en rojo(is-invalid)
    if (document.querySelectorAll('.is-invalid').length == 0) {
        const persona = {
            run: document.getElementById('run').value,
            nom: document.getElementById('nombre').value.trim(),
            ape: document.getElementById('apellido').value.trim(),
            email: document.getElementById('email').value,
            fecha_prest: document.getElementById('fechaPrestamo').value,
            titulo: document.getElementById('titulo').value,
            aut: document.getElementById('autor').value,
            genero: document.getElementById('generoLiterario').value,
            fecha_dev: document.getElementById('fechaDevolucion').value,
        }
        if (document.getElementById('btnGuardar').value == 'Guardar') {
            save(persona)
        } 
        else{
            edit(id,persona)
            id = 0
        }
        limpiar()
    }
})
//DOMContentLoaded es una evento que se activa al recargar la página
window.addEventListener('DOMContentLoaded', () => {
    //función que recibe los datos de la db 
    getData((datos) => {
        let tabla = ''
        datos.forEach((doc) => {
            //data trae todos los valores de los documentos de la base datos
            const item = doc.data()

            tabla += `<tr>
            <td>${item.run}</td>
            <td>${item.nom}</td>
            <td>${item.ape}</td>
            <td>${item.email}</td>
            <td>${item.fecha_prest}</td>
            <td>${item.titulo}</td>
            <td>${item.aut}</td>
            <td>${item.genero}</td>
            <td>${item.fecha_dev}</td>
            <td nowrap>
                <button class="btn btn-warning" id="${doc.id}">Editar</button>
                <button class="btn btn-danger" id="${doc.id}">Eliminar</button>
            </td>
        </tr>`
        })
        document.getElementById('contenido').innerHTML = tabla
        //recorrer todos los botones eliminar
        document.querySelectorAll('.btn-danger').forEach(btn => {
            //verificar en que botón se hizo click
            btn.addEventListener('click', () => {
                Swal.fire({
                    title: "¿Está seguro que desea eliminar el registro?",
                    text: "No podrá revertir los cambios",
                    icon: "error",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then((result) => {
                    //entra si presionamos eliminar
                    if (result.isConfirmed) {
                        //invocamos la función que permite eliminar el documento, enviando el id
                        remove(btn.id)
                        Swal.fire({
                            title: "Eliminado!",
                            text: "Su registro ha sido eliminado!",
                            icon: "success"
                        })
                    }
                })
            })
        })
        //recorrer todos los botones editar para seleccionar el registro
        document.querySelectorAll('.btn-warning').forEach(btn => {
            //async y await permite esperar una respuesta de la función para continuar con el código 
            btn.addEventListener('click', async () => {
                //ejecutamos la consulta que retorna el documento pasando el id como parametro
                const biblioteca = await selectOne(btn.id)
                //capturamos los valores del documento
                const e = biblioteca.data()
                //pasar valores a los inputs
                document.getElementById('run').value = e.run
                document.getElementById('nombre').value = e.nom
                document.getElementById('apellido').value = e.ape
                document.getElementById('email').value = e.email
                document.getElementById('fechaPrestamo').value = e.fecha_prest
                document.getElementById('titulo').value = e.titulo
                document.getElementById('autor').value = e.aut
                document.getElementById('generoLiterario').value = e.genero
                document.getElementById('fechaDevolucion').value = e.fecha_dev
                //cambiar el botón a editar
                document.getElementById('btnGuardar').value = 'Editar'
                //solo lectura el run
                document.getElementById('run').readOnly = true
                //asignar el id del documento 
                id = biblioteca.id
            })
        })
    })
})