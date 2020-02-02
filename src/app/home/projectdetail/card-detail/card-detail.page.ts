import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { ActionSheetController, PopoverController, AlertController } from '@ionic/angular';
import { TaskService } from 'src/app/services/task.service';
import { PopoverComponent } from 'src/app/popover/popover.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.page.html',
  styleUrls: ['./card-detail.page.scss'],
})
export class CardDetailPage implements OnInit {

  card;
  tasks;
  public press: number = 0;
  addTask: FormGroup
  developers;
  cu={};
  cardFounder
  constructor(
    private formBuilder: FormBuilder,
    public popoverController:PopoverController,
    public actionSheetController: ActionSheetController,
    private _location: Location,
    private router: Router,
    private route:ActivatedRoute,
    private task:TaskService,
    private authService: AuthService,
    private alertController:AlertController
  ) {
    this.authService.getSpecialData().subscribe(res=>{
      this.cu=res;
    })
   }

   calculateDif(event) {
    //  let diff = Math.abs(event.deadline - event.createdAt); return new Date(diff);
    let difference = new Date(event.deadline).getTime() - new Date().getTime();
    if(difference<0){
      return 'Expired';
    }else{
      return (Math.round(difference/3600000)+' Hour');
    }
  }

   pressEvent(e) {
    this.press++
  }

  async newTask(event){
    console.log("saad")
    await this.task.addTask(this.addTask.value, this.card).subscribe();
    this.authService.sendnotif({
      'title': "New task",
      'description': "You have a new task, go to home to check",
      'reciever': this.addTask.value.owner
    }).subscribe();
    this.ngOnInit();
    this.showAlert("New Task has been added.", 'SUCCESS');

  }

  ngOnInit() {
    this.addTask = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      deadline: ['', [Validators.required]],
      owner: ['', [Validators.required]],
    });
    this.route.params.forEach((params: Params) => {
  		this.card = params;
    });
    this.task.getTaskByCard(this.card).subscribe(res => {
      this.tasks = res;
    });
    this.authService.getdevelopers().subscribe(res => {
      this.developers = res;
      console.log('developers');
      console.log(this.developers);
    });
  }

  goBack(){
    this._location.back();
  }


  async presentActionSheet(t) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Project options',
      buttons: [ {
        text: 'Details',
        icon: 'information-circle',
        handler: () => {
          this.showAlert(t.description, t.title);
        }
      },
      {
        text: 'Edit',
        icon: 'hammer',
        handler: () => {
          console.log('Edit card clicked');
        }
      },
      {
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.task.deleteTask(t).subscribe();
          this.ngOnInit();
          this.showAlert("Successfully deleted", t.title);

      }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]
    });
    await actionSheet.present();
  }


  async presentActionSheet2(t) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Project options',
      buttons: [ {
        text: 'Details',
        icon: 'information-circle',
        handler: () => {
          this.showAlert(t.description, t.title);
        }
      },
      {
        text: 'Ask to Join',
        icon: 'person-add',
        handler: () => {
          this.authService.getCardFounder({'_id': t._id}).subscribe(res=>{
            this.cardFounder=res
          })

          this.authService.sendnotif({
            'title': "Task Join Request",
            'description': "Hello Sir, i want to join the task <b>"+t.title +"</b>",
            'reciever': this.cardFounder.taskgroup.project.owner._id
          }).subscribe(res=>{
            this.showAlert("Your joining request has been sent", 'SUCCESS');
          });          
        }
      },
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]
    });
    await actionSheet.present();
  }



  async presentActionSheet3(t) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Project options',
      buttons: [ {
        text: 'Details',
        icon: 'information-circle',
        handler: () => {
          this.showAlert(t.description, t.title);
        }
      },
      {
        text: 'Ask to left',
        icon: 'log-out',
        handler: () => {
          this.authService.getCardFounder({'_id': t._id}).subscribe(res=>{
            this.cardFounder=res
            this.authService.sendnotif({
              'title': "Task left Request",
              'description': "Hello Sir, i want to left the task <b>"+t.title +"</b> of the card "+this.cardFounder.taskgroup.title+" included in the project "+this.cardFounder.taskgroup.project.title,
              'reciever': this.cardFounder.taskgroup.project.owner._id
            }).subscribe(res=>{
              this.showAlert("Your lefting request has been sent", 'SUCCESS');
            });              
          })

        }
      },
      {
        text: 'Update Progress',
        icon: 'stats',
        handler: () => {
          this.presentAlertPrompt(t);       
        }
      },
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]
    });
    await actionSheet.present();
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  showAlert(msg, header) {
    let alert = this.alertController.create({
      message: msg,
      header: header,
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }

  async presentAlert(x,y) {
    const alert = await this.alertController.create({
      header: x,
      message: y
    });

    await alert.present();
  }

  async presentAlertPrompt(t) {
    const alert = await this.alertController.create({
      header: 'Task Progress',
      inputs: [
        {
          name: 'progress',
          type: 'number',
          value: t.progress*100,
          min: 0,
          max: 100
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            console.log(JSON.stringify(data));
            this.task.updateProgress({
              '_id':t._id,
              'progress': data.progress
            }).subscribe(res=>{
              this.presentAlert("SUCCES", "Task progress successfully updated");
              this.ngOnInit();
            })
          }
        }
      ]
    });

    await alert.present();
  }
  

}
