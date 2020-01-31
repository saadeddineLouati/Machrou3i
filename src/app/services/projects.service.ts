import { Platform, AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { tap, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  url = environment.url;
  user = null;
  userdata = null;
  constructor(private http: HttpClient, private alertController: AlertController) { }
  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: 'Error',
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }

  getProjects() {
    return this.http.get(`${this.url}/projects`).pipe(
      catchError(e => {
        let status = e.status;
        if (status === 401) {
          this.showAlert('You are not authorized for this!');
        }
        throw new Error(e);
      })
    )
  }

  getProjectById(credentials) {
    return this.http.post(`${this.url}/projects/getProjectById`, credentials).pipe(
      catchError(e => {
        let status = e.status;
        if (status === 401) {
          this.showAlert('You are not authorized for this!');
        }
        throw new Error(e);
      })
    )
  }

  addProject(credentials) {
    return this.http.post(`${this.url}/projects/addproject`, credentials).pipe(
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new Error(JSON.stringify(e));
      })
    );
  }

  deleteProject(credentials) {
    console.log(credentials);
    return this.http.post(`${this.url}/projects/removeproject`, credentials).pipe(
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new Error(JSON.stringify(e));
      })
    );
  }

}
