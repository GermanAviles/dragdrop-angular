import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore,
         AngularFirestoreCollection,
         AngularFirestoreDocument } from '@angular/fire/firestore';

import * as firebase from 'firebase';
import { FileItem } from '../models/file-item';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CargarimagenesService {

  private CARPETA_IMAGENES = 'img';

  private imgsCollection: AngularFirestoreCollection<any>;

  public imagenes: any[];

  constructor( private afs: AngularFireStorage,
               private db: AngularFirestore ) {
    this.imgsCollection = this.db.collection<any>(`/${this.CARPETA_IMAGENES}`);
  }

  cargarImagenes( imagenes: FileItem[] ) {

    const storageRef = firebase.storage().ref();

    for ( const item of imagenes ) {
      item.subiendoFile = true;

      if ( item.progress >= 100 ) {
        continue;
      }
      // guardamos los archivos que el usuario desee subir
      const uploadTask: firebase.storage.UploadTask = storageRef.
                        child(`${this.CARPETA_IMAGENES}/${item.nombreArchivo}`).
                        put( item.archivo );
      // mientras este subiendo el archivo (imagen) en los diferentes callbacks ejecutamos
      uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
          // obteneos el porcentaje de carga con la operación de los bytes de transferencia entre los bytes totales * 100
          ( snapshot: firebase.storage.UploadTaskSnapshot ) => item.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          ( error ) => console.error('Error al subir la imagen: ' + error.message ),
          () => {
            // si ejecuta esto quiere decir que no hubo ningun error
            console.log('Imagen cargada correctamente');
            // tratamos de obtener el url de la imagen subida
            uploadTask.snapshot.ref.getDownloadURL().then( (downURL) => {
              // si lo conseguimos se la pasamos a la propiedad 'urlArchivo' de la imagen
              item.urlArchivo = downURL;
              item.subiendoFile = false;
              // llamamos nuestra función que guarda los datos en la db de firebase (cloud firestore)
              this.guardarImg( { nombre: item.nombreArchivo, url: item.urlArchivo } );
            });

          });

    }
  }

  private guardarImg( img: { nombre: string, url: string } ) {

    this.db.collection(`${this.CARPETA_IMAGENES}`).add(img);

  }

  getImagenes() {
    return this.imgsCollection.valueChanges();
    // esto es para filtrar la información cuando hay demasiados datos basura
    // .pipe( map( (imagenes: any[]) => {
    //     console.log(imagenes);

    //     this.imagenes = [];

    //     imagenes.forEach( (imagen) => {
    //       // this.imagenes.unshift(imagen);
    //       this.imagenes.push(imagen);
    //     });

    //     return this.imagenes;

    //   })
    // );
  }

}
