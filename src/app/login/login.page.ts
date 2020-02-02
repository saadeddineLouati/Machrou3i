import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../app/services/auth.service'
import { AlertController } from '@ionic/angular';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 
  credentialsForm: FormGroup;
  credentialsForm2: FormGroup;
 
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private alertController: AlertController) { }
 
  ngOnInit() {
    this.credentialsForm2 = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username:['',Validators.required],
      position:['',Validators.required],
      gender:['', Validators.required],
      phone:['', Validators.required],
      company:['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cpassword: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.credentialsForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
 
  onSubmit() {
    
    this.authService.login(this.credentialsForm.value).subscribe();
  }
 
  register() {
    console.log(this.credentialsForm2.value)

    this.authService.register(this.credentialsForm2.value).subscribe(async res => {
      await this.authService.login({email: this.credentialsForm2.value.email, password: this.credentialsForm2.value.password}).subscribe();

    });
  }
 
  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: 'Error',
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }
}