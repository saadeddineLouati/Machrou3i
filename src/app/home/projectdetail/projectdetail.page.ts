import { Component, OnInit } from '@angular/core';
import { Params,Router, ActivatedRoute } from '@angular/router';
import { TaskgroupService } from 'src/app/services/taskgroup.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActionSheetController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-projectdetail',
  templateUrl: './projectdetail.page.html',
  styleUrls: ['./projectdetail.page.scss'],
})
export class ProjectdetailPage implements OnInit {
  project;
  taskgroups;
  reload="false"
  cu={};
  constructor(private alertController: AlertController, private taskgroupService:TaskgroupService, public actionSheetController: ActionSheetController, private authService: AuthService,private router: Router,  private route:ActivatedRoute, private taskgroup: TaskgroupService) {
    this.authService.getSpecialData().subscribe(res=>{
      this.cu=res;
    })
   }

  ngOnInit() {
    this.getProject();
  }

  getProject(){
    this.route.params.forEach((params: Params) => {
      this.project = params;
    });
    
    this.taskgroup.getTaskGroupByProject(this.project).subscribe(res => {
      console.log(this.project);
      this.taskgroups = res;
    });
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Project options',
      buttons: [ {
        text: 'Add New Card',
        icon: 'add-circle',
        handler: () => {
          this.addCard();
        }
      },
      {
        text: 'Edit',
        icon: 'hammer',
        handler: () => {
          console.log('Edit clicked');
        }
      },
      {
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
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
  
  async onDeleteCard(taskGroup){
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Do you really want to delete <strong>' + taskGroup.title + '</strong> ?',
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
            await this.taskgroupService.deleteTaskGroup(taskGroup).subscribe(async res => {
              this.getProject();
              // this.router.navigate(['/']);
            });
          }
        }
      ]
    });

    await alert.present();
  }

  onUpdateCard(t){
    this.router.navigate(['menu/projectdetail/updatecard', t])
  }

  carDetails(t){
    this.router.navigate(['menu/projectdetail/card-detail', t])
  }

  addCard(){
    this.router.navigate(['menu/projectdetail/add-card',this.project])
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.ngOnInit();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  
}
