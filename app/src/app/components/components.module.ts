import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component';
import { MapaComponent } from './mapa/mapa.component';
import { SwiperModule } from 'swiper/angular';
import { ChatBoxComponent } from './chat-box/chat-box.component';


@NgModule({
  declarations: [
    PostsComponent,
    PostComponent,
    AvatarSelectorComponent,
    MapaComponent,
    ChatBoxComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
    SwiperModule
  ],
  exports: [
    PostsComponent,
    AvatarSelectorComponent,
    MapaComponent,
    ChatBoxComponent
  ]
})
export class ComponentsModule { }
