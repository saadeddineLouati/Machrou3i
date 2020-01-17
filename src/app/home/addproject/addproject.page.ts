import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ProjectsService } from 'src/app/services/projects.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.page.html',
  styleUrls: ['./addproject.page.scss'],
})
export class AddprojectPage implements OnInit {
  addProjectForm: FormGroup
  constructor(private formBuilder: FormBuilder, private projectsService: ProjectsService, private alertController: AlertController, private router: Router) { }

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

  addProject(){
    this.projectsService.addProject(this.addProjectForm.value).subscribe();
    this.router.navigate(['menu/home']);  
    this.showAlert("Your project has been added successfully", "Success")
  }
    
    showAlert(msg, header) {
      let alert = this.alertController.create({
        message: msg,
        header: header,
        buttons: [{
          text: 'Ok',
          handler: () => {
            this.router.navigate(['menu/home']);
            
            this.alertController.dismiss()
          }
        }]
      });
      alert.then(alert => alert.present());
    }
}
