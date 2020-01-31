import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AlertController, PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';


@Component({
  selector: 'app-research',
  templateUrl: './research.page.html',
  styleUrls: ['./research.page.scss'],
})
export class ResearchPage implements OnInit {
  newDealForm: FormGroup;
  deals;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertController: AlertController,
    public popoverController:PopoverController,

  ) { }

 async ngOnInit() {
    this.newDealForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description:['',Validators.required],
      size:['',Validators.required],
      kind:['', Validators.required],
      start:['', Validators.required],
      deadline: ['', [Validators.required]],
    });
    await this.authService.getDeals().subscribe(res=>{
      this.deals=res;
      console.log(this.deals);
    });
  }

  async newDeal(){
    await this.authService.newDeal(this.newDealForm.value).subscribe();
    this.ngOnInit();
  }

  async openDeal(d){
    this.presentPopover(d,d);
  }

  async presentPopover(ev: any, deal) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      translucent: true,
      componentProps:{deal:deal}

    });
    return await popover.present();
  }
}
