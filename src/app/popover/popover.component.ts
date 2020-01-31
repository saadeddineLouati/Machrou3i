import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Params } from '@angular/router';
import { NavParams, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  users
  deal
  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private navParams: NavParams,
    private authService: AuthService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.callDevelopersFunction();
    this.deal=this.navParams.get('deal')
  }

  callDevelopersFunction(){
    this.auth.getdevelopers().subscribe(res => {
      this.users = res;
    });
  }

  async negociate(){
    this.authService.sendnotif({
      'title': "Hello Sir, i saw your offer in the deals corner",
      'description': "Hello Sir, i saw your offer in the deals corner, if it is available yet do not hesitate to contact me.",
      'reciever': this.deal.owner._id
    }).subscribe(res=>{
      this.showAlert("Your application has been sent", 'SUCCESS');
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
