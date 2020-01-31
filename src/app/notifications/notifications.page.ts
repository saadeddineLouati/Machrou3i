import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  notifs;
  constructor(
    private authService: AuthService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.authService.getNotif().subscribe(res=>{
      this.notifs=res
      console.log(this.notifs);
    })
  }

  openNotif(t){
    this.showAlert(t.description, t.sender.username);
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
