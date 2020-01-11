import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthenticateService } from '../services/authenticate.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  validation_messages = {
    email: [
      { type: 'required', message: 'El email es requerido'},
      { type: 'pattern', message: 'Ojo! este no es un email valido'}
    ],
    password: [
      { type: 'required', message: 'La contraseña es requerida'},
      { type: 'minlength', message: 'La contraseña es demasiado corta'},
    ]
  }
  errorMessage: string  = ""

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticateService,
    private navCtrl: NavController,
    private store: Storage
  ) { 
    this.loginForm = this.formBuilder.group({
      email: new FormControl(
        "", Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-z0-9-]+.[a-zA-z0-9-.]+$")
        ]) 
      ),
      password: new FormControl(
        "", Validators.compose([
          Validators.required,
          Validators.minLength(5)
        ]) 
      )
    });
  }

  ngOnInit() {
  }

  loginUser(values){
    this.authService.loginUser(values).then(res=>{
      this.errorMessage = "";
      this.store.set('isUserLoggedIn', true)
      this.navCtrl.navigateForward("/menu/home")
    }).catch((error)=>{
      this.errorMessage = error
    })
  }

  goToRegister(){
    this.navCtrl.navigateForward('/register')
  }

}
