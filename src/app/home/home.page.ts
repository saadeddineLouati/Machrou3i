import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  projects ;
  constructor(private authService: AuthService, private storage: Storage, private toastController: ToastController, private router: Router) { 
    this.authService.getProjects().subscribe(res => {
      this.projects = res;
    });
  }

  ngOnInit() {
  }

  addNewProject(){
    this.router.navigate(['home/addproject']);
  }
  projetDetail(p){
    this.router.navigate(['home/projectdetail', p]);
  }
}
