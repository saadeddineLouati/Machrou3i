import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { Platform, AlertController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

const TOKEN_KEY = 'access_token';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.url;
  user = null;
  userdata = null;
  authenticationState = new BehaviorSubject(false);
  constructor(private http: HttpClient, private helper: JwtHelperService, private storage: Storage,private plt: Platform, private alertController: AlertController) { }

  getProjects() {
    return this.http.get(`${this.url}/projects`).pipe(
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

  getdevelopers() {
    return this.http.get(`${this.url}/users/developers`).pipe(
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

  getConversations() {
    return this.http.get(`${this.url}/conversations`).pipe(
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
 
  isAuthenticated() {
    return this.authenticationState.value;
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


  getCurrentUser() {
    return this.http.get(`${this.url}/users/special`).pipe(
      catchError(e => {
        let status = e.status;
        if (status === 401) {
          this.showAlert('You are not authorized for this!');
          this.logout();
        }
        throw new Error(JSON.stringify(e));
      })
    )
  }

  sendMsg(credentials) {
    return this.http.post(`${this.url}/messages/newMessage`, credentials).pipe(
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new Error(JSON.stringify(e));
      })
    );
  }


  
  getMessages(credentials) {
    return this.http.post(`${this.url}/messages/chatwith`, credentials).pipe(
      catchError(e => {
        let status = e.status;
        if (status === 401) {
          this.showAlert('You are not authorized for this!');
          this.logout();
        }
        throw new Error(JSON.stringify(e));
      })
    )
  }

  getMeetings() {
    return this.http.get(`${this.url}/meetings`).pipe(
      catchError(e => {
        let status = e.status;
        if (status === 401) {
          this.showAlert('You are not authorized for this!');
          this.logout();
        }
        throw new Error(JSON.stringify(e));
      })
    )
  }

  addMeeting(credentials) {
    return this.http.post(`${this.url}/meetings/newmeeting`, credentials).pipe(
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new Error(JSON.stringify(e));
      })
    );
  }
}
