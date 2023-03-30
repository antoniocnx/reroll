import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NgForm } from '@angular/forms';
import { InterfazUsuarioService } from 'src/app/services/interfaz-usuario.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-actualiza-perfil',
  templateUrl: './actualiza-perfil.page.html',
  styleUrls: ['./actualiza-perfil.page.scss'],
})
export class ActualizaPerfilPage implements OnInit {

  usuario: Usuario = {};

  constructor(private usuarioService: UsuarioService,
              private interfazUsuario: InterfazUsuarioService,
              private navCrtl: NavController) { }

  ngOnInit() {
    this.usuario = this.usuarioService.getUsuario();
  }

  async actualizar(formActualizar: NgForm) {
    if(formActualizar.invalid) {
      return;
    }

    const actualizado = await this.usuarioService.actualizarUsuario(this.usuario);

    if(actualizado) {
      // Toast con el mensaje
      this.interfazUsuario.presentToast('Usuario actualizado correctamente');
    } else {
      // Toast con el error
      this.interfazUsuario.presentToast('Error al actualizar el usuario');
    }

    this.navCrtl.navigateRoot('main/tabs/perfil', {animated: true});
  }

}
