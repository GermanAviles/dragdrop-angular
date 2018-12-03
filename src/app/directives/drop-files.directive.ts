import { Directive, EventEmitter,
  ElementRef, HostListener,
  Input, Output } from '@angular/core';

import { FileItem } from '../models/file-item';
@Directive({
  selector: '[appDropFiles]'
})
export class DropFilesDirective {

  @Input() archivos: FileItem[] = [];
  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  // Emitimos cual el mouse este sobre el elemento
  @HostListener('dragover', ['$event'])
  public onDragEnter( event: any ) {
    this.mouseSobre.emit(true);
    this._prevenirDetener( event );
  }
  // Emitimos cuando el mouse salga del elemento
  @HostListener('dragleave', ['$event'])
  public onDragleave( event: any ) {
    this.mouseSobre.emit(false);
  }

   // Emitimos cuando suelten un archivo
   @HostListener('drop', ['$event'])
   public onDrop( event: any ) {

     const transferencia = this._getTransferencia( event );

     if ( !transferencia ) {
       return;
      }

      this._extraerArchivos( transferencia.files );
      this._prevenirDetener( event );

      this.mouseSobre.emit(false);
   }
   // extendemos la compatibildiad retornando donde tienen la data los distintos navegadores
   private _getTransferencia( event: any) {
     return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
   }

   private _extraerArchivos( archivosLista: FileList ) {
    // tslint:disable-next-line:forin
    for ( const propiedad in Object.getOwnPropertyNames( archivosLista ) ) {
      const archivoTemporal = archivosLista[propiedad];

      if ( this._archivoPuedeCargarse( archivoTemporal ) ) {
        const nuevoArchivo = new FileItem( archivoTemporal );
        this.archivos.push( nuevoArchivo );
      }
    }

    console.log(this.archivos);

   }

  // validaciones

  private _archivoPuedeCargarse( archivo: File ): boolean {
    if ( !this._archivoSuelto( archivo.name ) && this._esImg( archivo.type ) ) {
      return true;
    } else {
      return false;
    }
  }


  private _prevenirDetener( event ) {
    event.preventDefault();
    event.stopPropagation();
  }

  private _archivoSuelto( nombreArchivo: string ): boolean {

    for ( const archivo of this.archivos ) {

      if ( archivo.nombreArchivo === nombreArchivo) {
        console.log('el archivo: ' + nombreArchivo + ' ya esta agregado');
        return true;
      }

    }

    return false;
  }

  private _esImg( tipoArchivo ): boolean {
    return ( tipoArchivo === '' || tipoArchivo === undefined) ? false : tipoArchivo.startsWith('image');
  }

}
