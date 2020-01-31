import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

import {Socket} from 'ng-socket-io';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  currentuser;
  reciever;
  newMsg=''

  messages;
  @ViewChild(IonContent, null) content: IonContent

  constructor(
    private socket: Socket,
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService
  ) { }
 
  ngOnInit() {
    this.route.params.forEach((params: Params) => {
  		this.reciever = params;
    });
    this.userService.getMessages({
      "_id":this.reciever._id
    }).subscribe(res=>{
      this.messages = res
      this.messages = this.stack(this.messages);
      console.log(this.messages)
    });

  this.authService.getSpecialData().subscribe(res=>{
    this.currentuser=res;
    console.log(this.currentuser);
  })



  }


  stack(d){
    const result = [];
    const map = new Map();
    for (const item of d) {
        if(!map.has(item.createdAt)){
            map.set(item.createdAt, true);    // set any value to Map
            result.push(item);
        }
    }
    return result;
  }
  sendMessage(){
    this.messages.push({
      user: this.currentuser,
      createdAt: new Date().getTime(),
      msg: this.newMsg
    });

    this.userService.sendMsg({
      message:this.newMsg,
      reciever:this.reciever._id
    }).subscribe(res=>{
      this.ngOnInit();
    })
    
    this.newMsg='';
    setTimeout(() => {
      this.content.scrollToBottom(200); 
    });
  }

  joinChat(){
    this.socket.connect();
  }


}
