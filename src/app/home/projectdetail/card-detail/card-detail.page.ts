import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { ActionSheetController } from '@ionic/angular';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.page.html',
  styleUrls: ['./card-detail.page.scss'],
})
export class CardDetailPage implements OnInit {

  card;
  tasks;
  public press: number = 0;
  constructor(public actionSheetController: ActionSheetController,private _location: Location, private router: Router,  private route:ActivatedRoute, private task:TaskService) {
    this.task.getTasks().subscribe(res => {
      this.tasks = res;
    });
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

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
  		this.card = params;
    });
  }

  goBack(){
    this._location.back();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Project options',
      buttons: [ {
        text: 'Add New Task',
        icon: 'add-circle',
        handler: () => {
          console.log('Add New Task');
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

}
