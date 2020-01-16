import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.page.html',
  styleUrls: ['./conversations.page.scss'],
})
export class ConversationsPage implements OnInit {
  conversations

  constructor(private authService: AuthService, private storage: Storage, private toastController: ToastController, private router: Router) { 
    this.authService.getConversations().subscribe(res => {
      this.conversations = res;
    });
  }

  ngOnInit() {
  }

  newChat(){
    this.router.navigate(['chat']);
  }

}
