export class FileItem {

  public archivo: File;
  public nombreArchivo: string;
  public urlArchivo: string;
  public subiendoFile: boolean;
  public progress: number;

  constructor( archivo: File ) {
    this.archivo = archivo;
    this.nombreArchivo = archivo.name;

    this.subiendoFile = false;
    this.progress = 0;
  }

}
