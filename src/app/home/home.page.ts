import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController, AlertController } from '@ionic/angular';
import { AuthService } from './../services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TaskgroupService } from '../services/taskgroup.service';
import { ProjectsService } from '../services/projects.service';
import { async } from '@angular/core/testing';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  projects;
  getTaskgroups;
  deleted;
  constructor(private route: ActivatedRoute, private changeRef: ChangeDetectorRef, private authService: AuthService, private storage: Storage, private toastController: ToastController, private router: Router, private taskgroup: TaskgroupService, private alertController: AlertController, private projectsService: ProjectsService) {
  }

  ngOnInit() {
  }

  addNewProject() {
    this.router.navigate(['home/addproject']);
  }
  projetDetail(p) {
    this.router.navigate(['menu/projectdetail', p]);
  }

  getProjects() {

    // this.route.params.forEach((params: Params) => {
    // 	this.projects = params;
    // });
    console.log(this.route.snapshot.paramMap);

    this.authService.getProjects().subscribe(res => {
      this.projects = res;
    });
  }

  ionViewWillEnter() {
    this.getProjects();
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }

  async onDeleteProject(project) {
    let p = project;
    await this.presentAlertConfirm(p)
  }

  onUpdateProject(id) {
    console.log(id);
  }

  async presentAlertConfirm(project) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Do you really want to delete <strong>' + project.title + '</strong> ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: async () => {
            await this.projectsService.deleteProject(project).subscribe(async res => {
              this.deleted = res;
              this.getProjects();
              this.router.navigate(['/']);
            });
          }
        }
      ]
    });

    await alert.present();
  }
}
