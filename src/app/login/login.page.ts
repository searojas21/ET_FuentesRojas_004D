import { Component,OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';  
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userdata:any;

  usuario={
    id:0,
    username:"",
    email:"",
    password:"",
    isactive:false
  }

  loginForm:FormGroup;

  constructor(private authservice:AuthService, private router:Router, private toast: ToastController,
              private alertcontroller: AlertController, private builder: FormBuilder,private menu:MenuController) {
                this.loginForm = this.builder.group({
                  'username' : new FormControl("", [Validators.required, Validators.minLength(6)]),
                  'password' : new FormControl("", [Validators.required, Validators.minLength(8)]),
                })
               }

  ngOnInit() {
  }


  login() {
    if (!this.loginForm.valid) {
      return;
    }
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
  
    this.authservice.GetUserByUsername(username).subscribe(resp => {
      this.userdata = resp;
      console.log(this.userdata);
  
      if (this.userdata.length === 0) {
        this.loginForm.reset();
        this.UsuarioNoExiste();
        return;
      }
  
      this.usuario = {
        id: this.userdata[0].id,
        username: this.userdata[0].username,
        password: this.userdata[0].password,
        email: this.userdata[0].email,
        isactive: this.userdata[0].isactive
      };
  
      if (this.usuario.password !== password) {
        this.loginForm.reset();
        this.ErrorUsuario();
        return;
      }
  
      if (!this.usuario.isactive) {
        this.loginForm.reset();
        this.UsuarioInactivo();
        return;
      }
  
      this.IniciarSesion(this.usuario);
    });
  }

  private IniciarSesion(usuario:any){
    sessionStorage.setItem('username', usuario.username);
    sessionStorage.setItem('password', usuario.password);
    sessionStorage.setItem('ingresado', 'true');
    this.showToast('Sesión Iniciada '+ this.usuario.username);
    this.router.navigate(['/home']);

  }

  
  async showToast(msg: any){
    const toast= await this.toast.create({
      message:msg,
      duration: 3000
    })
    toast.present();
  }

  
  async UsuarioInactivo(){
    const alerta = await this.alertcontroller.create({ 
      header : 'Usuario inactivo',
      message : 'Contactar a admin@admin.cl',
      buttons : ['OK']
    })
    alerta.present();
  }

  
async ErrorUsuario(){
  const alerta = await this.alertcontroller.create({ 
    header : 'Error..',
    message : 'Revise sus credenciales',
    buttons : ['OK']
  })
  alerta.present();
}

async UsuarioNoExiste(){
  const alerta = await this.alertcontroller.create({ 
    header : 'No existe...',
    message : 'Debe registrarse..',
    buttons : ['OK']
  })
  alerta.present();
}

Registrar(){
  this.router.navigate(['/registrate']);
}



// Ooooocultar el menú al entrar en la página de login
ionViewWillEnter() {
  this.menu.enable(false, 'first');
}

// Reeeeestaurar el menú al salir de la página de login
ionViewWillLeave() {
  this.menu.enable(true, 'first');
}


}
