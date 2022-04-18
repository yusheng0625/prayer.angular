import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AuthService } from 'src/app/core/service';
import { Router } from '@angular/router';
import { AppSettings } from 'src/app/app.settings';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {

  contactusForm:FormGroup;
  public name:AbstractControl;  
  public email:AbstractControl;
  public content:AbstractControl;

  bSent  = false;

  constructor(private formBuilder: FormBuilder, 
            private route:Router,
            private authService:AuthService, public appSettings:AppSettings) { 

    // appSettings.settings.theme.skin = "blue";
    // jQuery('.wrapper-inner').css("background-color", "white");

    this.contactusForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'email': ['', Validators.compose([Validators.required, CustomValidators.email])],
      'isMember':[1],
      'content': ['', Validators.required],
    });
    this.name = this.contactusForm.controls['name'];
    this.email = this.contactusForm.controls['name'];
    this.content = this.contactusForm.controls['name'];
  }

  ngOnInit() {
  }

  onSubmit(value)
  {
    this.authService.contactus(value).then(res=>{
      if(res)
        this.bSent = true;
    });
  }
  
}
