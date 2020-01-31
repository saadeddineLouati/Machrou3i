import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskgroupService } from 'src/app/services/taskgroup.service';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.page.html',
  styleUrls: ['./add-card.page.scss'],
})
export class AddCardPage implements OnInit {
  project;
  projectAfterSearch;
  addCardForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private taskgroupService: TaskgroupService,
    private authService: AuthService,
    private alertController: AlertController,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectsService
  ) { }

    back(){
      this.router.navigate(['menu/projectdetail', this.project])
    }

  async ngOnInit() {
    this.addCardForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      deadline: ['', [Validators.required]],
    });
   await this.init();
   await this.router.events.subscribe;
   this.getProject();
  }

  init(){
    this.route.params.forEach((params: Params) => {
  		this.project = params;
    });
  }

  async addTaskGroup(event) {
    await this.taskgroupService.addTaskGroup({
      'title': this.addCardForm.value.title,
      'description': this.addCardForm.value.description,
      'priority': this.addCardForm.value.priority,
      'deadline': this.addCardForm.value.deadline,
      'project': this.project._id
    }).subscribe();
    await this.authService.getProjects().subscribe(res => {
      this.router.navigate(['menu/projectdetail', this.getProject()]);
      this.showAlert("Your Card has been added successfully", "Success")
    });
  }

  getProject(){
    this.projectService.getProjectById(this.project).subscribe(res => {
      this.projectAfterSearch = res;
    });
    return this.projectAfterSearch;
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
