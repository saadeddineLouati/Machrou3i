import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { TaskgroupService } from '../services/taskgroup.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  projects ;
  getTaskgroups;
  constructor(private authService: AuthService, private storage: Storage, private toastController: ToastController, private router: Router, private taskgroup: TaskgroupService) { 
    this.authService.getProjects().subscribe(res => {
      this.projects = res;
    });
    this.taskgroup.getTaskgroups().subscribe(res => {
      this.getTaskgroups = res;
    });
  }

  ngOnInit() {
  }

  addNewProject(){
    this.router.navigate(['home/addproject']);
  }
  projetDetail(p){
    this.router.navigate(['menu/projectdetail', p]);
  }
}
