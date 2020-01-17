import { Component, OnInit } from '@angular/core';
import { Params,Router, ActivatedRoute } from '@angular/router';
import { TaskgroupService } from 'src/app/services/taskgroup.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-projectdetail',
  templateUrl: './projectdetail.page.html',
  styleUrls: ['./projectdetail.page.scss'],
})
export class ProjectdetailPage implements OnInit {
  project;
  taskgroups;
  constructor(public actionSheetController: ActionSheetController, private authService: AuthService,private router: Router,  private route:ActivatedRoute, private taskgroup: TaskgroupService) {
    this.taskgroup.getTaskgroups().subscribe(res => {
      this.taskgroups = res;
    });
   }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
  		this.project = params;
  	});
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Project options',
      buttons: [ {
        text: 'Add New Card',
        icon: 'add-circle',
        handler: () => {
          console.log('Add New Card');
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
  
  
  carDetails(t){
    this.router.navigate(['menu/projectdetail/card-detail', t])
  }

  addCard(t){
    this.router.navigate(['menu/projectdetail/addcard'])
  }
}
