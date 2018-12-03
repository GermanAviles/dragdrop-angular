import { Component, OnInit } from '@angular/core';
import { CargarimagenesService } from 'src/app/services/cargarimagenes.service';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styleUrls: ['./fotos.component.css']
})
export class FotosComponent implements OnInit {

  fotosFirebase: any[];

  constructor( private _imagenes: CargarimagenesService ) {
    this._imagenes.getImagenes().subscribe( (imagenes) => {
      this.fotosFirebase = imagenes;
    });
  }

  ngOnInit() {
  }

}
