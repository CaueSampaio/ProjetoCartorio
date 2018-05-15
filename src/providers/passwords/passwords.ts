import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the PasswordsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PasswordsProvider {
  private API_URL = 'https://reqres.in/api/'

  constructor(public http: Http) { }

  createAccount(email: string, password: string) {
    return new Promise((resolve, reject) => {
      var data = {
        email: email,
        password: password
      };
 
      this.http.post(this.API_URL + 'register', data)
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        });
    });
  }

  getAll(page: number) {
    return new Promise((resolve, reject) => {
 
      let url = this.API_URL + 'users/?per_page=10&page=' + page;
 
      this.http.get(url)
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        });
    });
  }

  createPassword(value: number) {
    return new Promise((resolve, reject) => {
      var data = {
        value: value
      };

      this.http.post(this.API_URL + 'emitir-senha', data)
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error.json())
        });
    });
  }

  getQueue() {
    return new Promise((resolve, reject) => {

      let url = this.API_URL + 'servicos';

      this.http.get(url)
        .subscribe((result: any) => {
          resolve(result.json())
        }),
        (error) => {
          reject(error.json())
        };
    });
  }

}
