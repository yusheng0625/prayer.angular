import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import {CacheService, AuthService } from '../../core/service';
import { AppSettings } from 'src/app/app.settings';

@Component({
  selector: 'app-login',
  templateUrl: './recoverpassword.component.html',
  styleUrls: ['./recoverpassword.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RecoverpasswordComponent {
  public router: Router;
  public form:FormGroup;
  public email:AbstractControl;
  bSentEmail:boolean = false;

  bError:boolean = false;
  errorMsg:string='';


  constructor(router:Router, fb:FormBuilder, private cache:CacheService, private auth:AuthService,public appSettings:AppSettings) {
    // appSettings.settings.theme.skin = "blue";   
    // jQuery('.wrapper-inner').css("background-color", "white");

      this.router = router;
      this.form = fb.group({
          'email': ['', Validators.compose([Validators.required, CustomValidators.email])]
      });
      this.email = this.form.controls['email'];
  }

  public onSubmit():void {
      if (this.form.valid) {
        this.auth.recoverpassword(this.form.value.email).then((res)=>{
            if(res)
            {
                this.bSentEmail = true;
            }
            else
            {   
                this.bError = true;
                this.errorMsg = this.auth._message;
            }
        }).catch((reason)=>{
            
        });        
      }
  }

  ngAfterViewInit(){
      document.getElementById('preloader').classList.add('hide');  
  }

}
