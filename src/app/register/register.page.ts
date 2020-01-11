import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authenticate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  registerForm: FormGroup

  validation_messages = {
    name: [
      { type: 'required', message: 'El nombre es requerido'},
    ],
    surname: [
      { type: 'required', message: 'El apellido es requerido'},
    ],
    email: [
      { type: 'required', message: 'El email es requerido'},
      { type: 'pattern', message: 'Ojo! este no es un email valido'}
    ],
    password: [
      { type: 'required', message: 'La contraseña es requerida'},
      { type: 'minlength', message: 'La contraseña es demasiado corta'},
    ]
  }

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private userService: AuthenticateService
  ) {
    this.registerForm = this.formBuilder.group({
      name: new FormControl(
        '', Validators.compose([
          Validators.required
        ])
      ),
      surname: new FormControl(
        '', Validators.compose([
          Validators.required
        ])
      ),
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
    })
  }

  async register(values){
    try{
      await this.userService.registerUser(values)
      this.navCtrl.navigateForward('/menu/home')
    }catch(error){
      console.log('Ocurrio un error')
    }
  }

  goToLogin(){
    this.navCtrl.navigateBack('/login')
  }


}
