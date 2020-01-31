import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  users
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.callDevelopersFunction();
    console.log(this.users);
  }

  callDevelopersFunction(){
    this.auth.getdevelopers().subscribe(res => {
      this.users = res;
    });
  }

}
