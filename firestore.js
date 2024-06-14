// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js"
import { addDoc, collection, deleteDoc, doc, getDoc,getDocs,query,where, getFirestore, onSnapshot, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js"
// DOCUMENTACIÓN: 
// https://firebase.google.com/docs/web/setup#available-libraries

//Para utilizar su base de datos cambiar la configuración 
const firebaseConfig = {
    apiKey: "AIzaSyAELOM3CFUztM8-JewNI-50_RKL0IBKMy4",
    authDomain: "proyecto-6d7f5.firebaseapp.com",
    projectId: "proyecto-6d7f5",
    storageBucket: "proyecto-6d7f5.appspot.com",
    messagingSenderId: "712012077594",
    appId: "1:712012077594:web:2b2c5b02907c0ede230fa3"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig)
//getFirestore es una función firestore que retorna la base de datos para su uso
const db = getFirestore(app)
//función para guardar datos
//export const save = (biblioteca) => {
    //addDoc es una función de firestore que permite añadir un nuevo documento
    //collection es una función de firestore que recibe la base de datos y la colección
 //   addDoc(collection(db, 'Biblioteca'), emp)
//}

//función que trae todos los documentos de la colección
export const getData = (data) => {
    //onSnapshot es el método que permite traer todos los documentos y asignarlos a variable
    onSnapshot(collection(db, 'Biblioteca'), data)
}
async function runExists(db, run) {
    const q = query(collection(db, 'Biblioteca'), where('run', '==', run));
    const snapshot = await getDocs(q);
    return !snapshot.empty;
}
export const save = async (emp) => {
    if (await runExists(db, emp.run)) {
        Swal.fire('RUN ya existe!','','error');
    }else{
        addDoc(collection(db, 'Biblioteca'),
emp);
    }
}
export const remove = async (docId) => {
	const docRef = await doc(db, 'Biblioteca', docId);
	deleteDoc(docRef)
		.then(() => {
			alert('Eliminado exitosamente');
		})
		.catch((error) => {
			alert('Error al eliminar: ', error);
		});
}

//función remove que sirve para eliminar un documento 
//export const remove = (id) => {
    //deleteDoc es una función de firestore que permite eliminar un documento 
    //doc es una función de firestore que permite traer un documento por su id
    //deleteDoc(doc(db, 'Biblioteca', id))
//}

//selectOne función que me permite selección un documento 
//getDoc es la función firestore que permite obtener un documento por su id
export const selectOne = (id) => getDoc(doc(db, 'Biblioteca', id))

//función que permite editar un documento 
export const edit = (id, emp) => {
    //updateDoc es la función de firestore que permite modificar un documento
    updateDoc(doc(db, 'Biblioteca', id), emp) //emp contiene los datos que reemplazarán el documento 
}
