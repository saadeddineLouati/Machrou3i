import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

import {Socket} from 'ng-socket-io';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

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
  ) { 
    this.getMessages().subscribe(message => {
      this.messages.push(message);
      setTimeout(() => {
        this.content.scrollToBottom(200); 
      });
    });
  }
 
  ngOnInit() {
    this.route.params.forEach((params: Params) => {
  		this.reciever = params;
    });
    this.userService.getMessages({
      "_id":this.reciever._id
    }).subscribe(async res=>{
      this.messages = res
      this.messages = this.stack(this.messages);
      this.messages.sort((a, b)=>{
        if(a.createdAt==b.createdAt){
          return 0;
        }else{
          if (a.createdAt>b.createdAt){
            return 1
          }else if (a.createdAt<b.createdAt){
            return -1
          }
        }
      });
      setTimeout(() => {
        this.content.scrollToBottom(200*this.messages.length);
      });
      this.socket.connect();
      this.socket.emit('set-nickname', this.currentuser, this.reciever)
    });

  this.authService.getSpecialData().subscribe(res=>{
    this.currentuser=res;
    console.log(this.currentuser);
  })
  }


  f(array,prop, desc) {
    array.sort(function(a, b) {
        if (a[prop] < b[prop])
            return desc ? 1 : -1;
        if (a[prop] > b[prop])
            return desc ? -1 : 1;
        return 0;
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
    // this.messages.push({
    //   user: this.currentuser,
    //   createdAt: new Date().getTime(),
    //   msg: this.newMsg
    // });
    this.socket.emit('add-message', {
      message:this.newMsg,
      reciever:this.reciever._id
    });

    this.userService.sendMsg({
      message:this.newMsg,
      reciever:this.reciever._id
    }).subscribe(res=>{
      this.ngOnInit();
    })
    
    this.newMsg='';
    setTimeout(() => {
      this.content.scrollToBottom(300); 
    });
  }

  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }

  joinChat(){
    this.socket.connect();
  }


}
