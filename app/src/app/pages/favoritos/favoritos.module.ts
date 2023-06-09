import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoritosPageRoutingModule } from './favoritos-routing.module';

import { FavoritosPage } from './favoritos.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    FavoritosPageRoutingModule,
    RouterModule,
    ComponentsModule
  ],
  declarations: [FavoritosPage]
})
export class FavoritosPageModule {}
