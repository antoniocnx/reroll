import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormsModule, FormControl, FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { InterfazUsuarioService } from 'src/app/services/interfaz-usuario.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import SwiperCore, { SwiperOptions, Pagination } from 'swiper';

SwiperCore.use([Pagination]);

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal', { static: true }) slides: IonSlides;

  // formSignup: FormGroup = new FormGroup ({
  //     nombre: new FormControl('Test 4'),
  //     apellidos: new FormControl('Apellidos'),
  //     email: new FormControl('test3@test.com'),
  //     password: new FormControl('123456'),
  //     nacimiento: new FormControl(new Date('01-01-2000')),
  //     sexo: new FormControl('Mujer'),
  //     direccion: new FormControl('Madrid'),
  //     ciudad: new FormControl('Madrid'),
  //     localidad: new FormControl('Madrid'),
  //     pais: new FormControl('España'),
  //     cp: new FormControl(10227),
  //     avatar: new FormControl('av-3.png')
  // })

  formLogin: FormGroup = this.formBuilder.group ({
    email: ['test1@test.com', [ Validators.required, Validators.email] ],
    password: ['123456', [ Validators.required ] ]
  })

  formSignup: FormGroup = this.formBuilder.group ({
    nombre: ['Test 4', Validators.required],
    apellidos: ['Test', Validators.required],
    email: ['test4@test.com', [Validators.required, Validators.email, this.emailAdminNoValido()] ],
    password: ['123456', [ Validators.required, Validators.minLength(6) ] ],
    nacimiento: [(new Date('2000-01-01')), Validators.required],
    sexo: ['Mujer', Validators.required],
    direccion: ['Calle Prueba', Validators.required],
    ciudad: ['Prueba', Validators.required],
    localidad: ['Prueba', Validators.required],
    pais: ['Prueba', Validators.required],
    cp: [101010, Validators.required],
    avatar: ['av-luffy.png']
  })

  constructor(private usuarioService: UsuarioService,
    private navCrtl: NavController,
    private interfazUsuario: InterfazUsuarioService,
    private formBuilder: FormBuilder) { 
      // Inicializa la propiedad slides en el constructor
      this.slides = {} as IonSlides; 
  }
  

  ngOnInit() {
    this.slides.lockSwipes(true);
  }

  valorFormulario() {
    console.log(this.formSignup.value);
  }


  async login(formLogin: FormGroup) {
    if(formLogin.invalid) {
      return;
    }

    // const valido = await this.usuarioService.login(this.loginUsuario.email, this.loginUsuario.password);
    const valido = await this.usuarioService.login(this.formLogin.value.email, this.formLogin.value.password);

    if(valido) {
      // Ir a tabs
      this.navCrtl.navigateRoot('/main/tabs/inicio', { animated: true });
    } else {
      // Alerta de error
      this.interfazUsuario.alertaLogin('Usuario o contraseña incorrecto.');
    }
    
  }

  async signup(formSignup: FormGroup) {
    if(formSignup.invalid) {
      return;
    }

    const valido = await this.usuarioService.registro(formSignup.value);
    console.log('Valor de VALIDO: ', valido);

    if(valido == false) {
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

  emailAdminNoValido(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const email = control.value;
      if (email && email.toLowerCase().endsWith('@admin.com')) {
        return { 'emailNoPermitido': true };
      }
      return null;
    };
  }

}
