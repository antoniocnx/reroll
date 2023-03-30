import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/interfaces';
import { InterfazUsuarioService } from 'src/app/services/interfaz-usuario.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal', { static: true }) slides: IonSlides;
  @ViewChild('formSignup') formularioRegistro: FormsModule | undefined;

  loginUsuario = {
    email: 'test1@test.com',
    password: '123456'
  }

  registroUsuario: Usuario = {
    nombre: 'Test 2',
    email: 'test2@test.com',
    password: '123456',
    avatar: 'av-1.png'
  }

  constructor(private usuarioService: UsuarioService,
              private navCrtl: NavController,
              private interfazUsuario: InterfazUsuarioService) { 
    // Inicializa la propiedad slides en el constructor
    this.slides = {} as IonSlides; 
  }
  

  ngOnInit() {
    this.slides.lockSwipes(true);
  }


  async login(formLogin: NgForm) {
    if(formLogin.invalid) {
      return;
    }

    const valido = await this.usuarioService.login(this.loginUsuario.email, this.loginUsuario.password);

    if(valido) {
      // Ir a tabs
      this.navCrtl.navigateRoot('/main/tabs/inicio', { animated: true });
    } else {
      // Alerta de error
      this.interfazUsuario.alertaLogin('Usuario o contraseña incorrecto.');
    }
    
  }

  async signup(formSignup: NgForm) {
    if(formSignup.invalid) {
      return;
    }

    const valido = await this.usuarioService.registro(this.registroUsuario);

    if(valido) {
      // Ir a tabs
      this.navCrtl.navigateRoot('/main/tabs/inicio', { animated: true });
    } else {
      // Alerta de error
      this.interfazUsuario.alertaLogin('Ya existe ese usuario.');
    }
  }

  irALogIn() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

  irASignUp() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }

}
