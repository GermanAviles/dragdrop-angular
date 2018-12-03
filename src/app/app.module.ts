import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_ROUTING } from './app.routes';


import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { firebase } from '../environments/firebase-envioroment';

import { AppComponent } from './app.component';
import { FotosComponent } from './components/fotos/fotos.component';
import { CargaComponent } from './components/carga/carga.component';
import { DropFilesDirective } from './directives/drop-files.directive';

@NgModule({
  declarations: [
    AppComponent,
    FotosComponent,
    CargaComponent,
    DropFilesDirective
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp( firebase )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
