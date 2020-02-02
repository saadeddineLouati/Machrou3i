import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { ActionSheetController, PopoverController, AlertController } from '@ionic/angular';
import { TaskService } from 'src/app/services/task.service';
import { PopoverComponent } from 'src/app/popover/popover.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  newMeeting: FormGroup;
  meetings;
  memebers;
  constructor(
    private formBuilder: FormBuilder,
    public popoverController:PopoverController,
    public actionSheetController: ActionSheetController,
    private _location: Location,
    private router: Router,
    private route:ActivatedRoute,
    private task:TaskService,
    private userService: UserService,
    private authService: AuthService,
    private alertController:AlertController

  ) { }

  ngOnInit() {
    this.newMeeting = this.formBuilder.group({
      title: ['', [Validators.required]],
      date: ['', [Validators.required]],
      members: ['', [Validators.required]]
    });

    this.getMeetings();
  }

  getMeetings(){
    this.userService.getMeetings().subscribe(res=>{
      this.meetings=res
      this.getMembers()
    })
  }

  addMeeting(event){
    this.userService.addMeeting(this.newMeeting.value).subscribe(res=>{
      console.log(this.newMeeting.value.members.length)
      for(var counter:number = 0; counter<this.newMeeting.value.members.length; counter++){
        this.authService.sendnotif({
          'title': "Meeting",
          'description': "You have a meeting with your supervisor in: "+this.newMeeting.value.date,
          'reciever': this.newMeeting.value.members[counter]
        }).subscribe();
      }
      this.ngOnInit();
    })
  }

  getMembers(){
    this.userService.getdevelopers().subscribe(res=>{
      this.memebers=res;
    })
  }



}
