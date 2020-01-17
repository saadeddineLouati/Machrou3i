import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { Platform, AlertController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
const TOKEN_KEY = 'access_token';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  url = environment.url;
  userdata = null;
  authenticationState = new BehaviorSubject(false);
  constructor(private http: HttpClient, private helper: JwtHelperService, private storage: Storage,private plt: Platform, private alertController: AlertController) { }

  getTasks(){
    return this.http.get(`${this.url}/tasks`).pipe(
      catchError(e => {
        let status = e.status;
        if (status === 401) {
          this.showAlert('You are not authorized for this!');
          this.logout();
        }
        throw new Error(e);
      })
    )
  }

  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: 'Error',
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }

  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }
}
