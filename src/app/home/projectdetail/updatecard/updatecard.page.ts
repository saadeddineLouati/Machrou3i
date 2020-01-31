import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskgroupService } from 'src/app/services/taskgroup.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';
import { ProjectsService } from 'src/app/services/projects.service';
import { UpdatecardPageModule } from './updatecard.module';

@Component({
  selector: 'app-updatecard',
  templateUrl: './updatecard.page.html',
  styleUrls: ['./updatecard.page.scss'],
})
export class UpdatecardPage implements OnInit {
  editCardForm:FormGroup
  card;
  project;
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

  ngOnInit() {

    this.route.params.forEach((params: Params) => {
  		this.card = params;
    });
    this.editCardForm = this.formBuilder.group({
      title: [this.card.title, [Validators.required]],
      description: [this.card.description, [Validators.required]],
      priority: [this.card.priority, [Validators.required]],
      deadline: [this.card.deadline, [Validators.required]],
    });
  }

  async editTaskGroup(event) {
    await this.taskgroupService.editTaskGroup({
      '_id': this.card._id,
      'title': this.editCardForm.value.title,
      'description': this.editCardForm.value.description,
      'priority': this.editCardForm.value.priority,
      'deadline': this.editCardForm.value.deadline,
      'project': this.card.project
    }).subscribe(res=>{
      this.projectService.getProjectByProjectId({'_id':this.card.project}).subscribe(res => {
        this.project = res;
        this.router.navigate(['menu/projectdetail', this.project]);
      });

    });

  }

}
