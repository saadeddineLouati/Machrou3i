import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ProjectsService } from 'src/app/services/projects.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.page.html',
  styleUrls: ['./addproject.page.scss'],
})
export class AddprojectPage implements OnInit {
  addProjectForm: FormGroup
  p;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private projectsService: ProjectsService,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.addProjectForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      size: ['', [Validators.required]],
      kind: ['', [Validators.required]],
      deadline: ['', [Validators.required]],
    });
  }

  onSubmit() {
    // this.authService.login(this.addProjectForm.value).subscribe();
  }

  async addProject(event) {
    await this.projectsService.addProject(this.addProjectForm.value).subscribe();
    await this.authService.getProjects().subscribe(res => {
      this.p = res;
      this.router.navigate(['menu/home', this.p]);
      this.showAlert("Your project has been added successfully", "Success")
    });
  }

  showAlert(msg, header) {
    let alert = this.alertController.create({
      message: msg,
      header: header,
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.alertController.dismiss();
        }
      }]
    });
    alert.then(alert => alert.present());
  }
}
