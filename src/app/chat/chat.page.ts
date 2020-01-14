import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  currentuser='saad';
  newMsg=''

  messages = [
    {
      user: 'saad',
      createdAt: 1554090856000,
      msg: 'Hi everyone ! '
    }, {
      user: 'zouba',
      createdAt: 1554090956000,
      msg: 'Gd morning ! '
    }, {
      user: 'saad',
      createdAt: 1554091056000,
      msg: 'Salut ! '
    }, {
      user: 'saad',
      createdAt: 1554091156000,
      msg: 'Hi everyone ! '
    },
  ]

  @ViewChild(IonContent, null) content: IonContent

  constructor() { }
 
  ngOnInit() {
  }


  sendMessage(){
    this.messages.push({
      user: this.currentuser,
      createdAt: new Date().getTime(),
      msg: this.newMsg
    });
    this.newMsg='';
    setTimeout(() => {
      this.content.scrollToBottom(200); 
    });
  }


}
