import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { PasswordsProvider } from './../../providers/passwords/passwords';

// @IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  model: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController, private passwordsProvider: PasswordsProvider) {
    this.model = new User();
    this.model.email = 'sydney@fife';
    this.model.password = 'pistol';
  }

  openPasswordStatus() {
    // this.navCtrl.push('AboutPage');
  }

  createAccount() {
    this.passwordsProvider.createAccount(this.model.email, this.model.password)
      .then((result: any) => {
        console.log(result)
        this.toast.create({ message: 'Usuário criado com sucesso. Token: ' + result.token, position: 'botton', duration: 3000 }).present();
 
        //Salvar o token no Ionic Storage para usar em futuras requisições.
        //Redirecionar o usuario para outra tela usando o navCtrl
        //this.navCtrl.pop();
        //this.navCtrl.setRoot()
      })
      .catch((error: any) => {
        this.toast.create({ message: 'Erro ao criar o usuário. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
      });
  }
}

export class Password {
  properties: any;
}

export class User {
  email: string;
  password: string;
}
