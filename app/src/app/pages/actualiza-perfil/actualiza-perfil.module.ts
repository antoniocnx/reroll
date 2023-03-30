import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActualizaPerfilPageRoutingModule } from './actualiza-perfil-routing.module';

import { ActualizaPerfilPage } from './actualiza-perfil.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActualizaPerfilPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ActualizaPerfilPage]
})
export class ActualizaPerfilPageModule {}
