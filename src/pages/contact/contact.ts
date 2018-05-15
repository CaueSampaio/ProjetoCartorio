import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, InfiniteScroll } from 'ionic-angular';
import { PasswordsProvider } from './../../providers/passwords/passwords'
import { ViewChild } from '@angular/core'

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  users: any[];
  page: number;
  passwords: any[];
  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController, private passwordsProvider: PasswordsProvider) {
  
  }

  ionViewDidEnter() {
    this.passwords = ['F001', 'F002', 'F003'];
    this.users = [];
    this.page = 1;
    this.infiniteScroll.enable(true);
    this.getAllUsers(this.page);
  }

  getAllUsers(page: number) {
    this.passwordsProvider.getAll(page)
      .then((result: any) => {
        console.log(result);
        for (var i = 0; i < result.data.length; i++) {
          var user = result.data[i];
          this.users.push(user);
        }
 
        if (this.infiniteScroll) {
          this.infiniteScroll.complete();
          if (this.users.length == result.total) {
            this.infiniteScroll.enable(false);
          }
        }
      })
      .catch((error: any) => {
        this.toast.create({ message: 'Erro ao listar os usuários. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
      });
  }

}
