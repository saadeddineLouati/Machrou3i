import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.page.html',
  styleUrls: ['./conversations.page.scss'],
})
export class ConversationsPage implements OnInit {
  conversations

  constructor(private authService: AuthService, private storage: Storage, private toastController: ToastController) { 
    this.authService.getConversations().subscribe(res => {
      this.conversations = res;
    });
  }

  ngOnInit() {
  }

}
