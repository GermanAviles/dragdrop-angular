import { Component, OnInit } from '@angular/core';
import { CargarimagenesService } from 'src/app/services/cargarimagenes.service';
import { FileItem } from '../../models/file-item';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.css']
})
export class CargaComponent implements OnInit {

  archivos: FileItem[] = [];
  sobreElemento = false;

  constructor( private _cargarimgs: CargarimagenesService ) { }

  ngOnInit() {
  }

  cargarImgs() {
  // this._cargarimgs.guardarImg(  );
  this._cargarimgs.cargarImagenes( this.archivos );
  }

  limpiar() {
    this.archivos = [];
  }

}
