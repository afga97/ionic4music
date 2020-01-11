import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(
    private storage: Storage
  ) { }

  async loginUser(credentials){
    const user = await this.storage.get('user')
    return new Promise((resolve, reject) => {
      if (credentials.email == user.email && credentials.password == user.password) {
        resolve("Login correctamente")
      }else{
        reject("Credenciales incorrectas")
      }
    })
  }

  registerUser(userData){
    return this.storage.set('user', userData)
  }
}
