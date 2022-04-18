import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import {CacheService, AuthService } from '../../core/service';
import { AppSettings } from 'src/app/app.settings';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
  public router: Router;
  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  bGotError:boolean = false;
  errorMsg = '';

  constructor(router:Router, fb:FormBuilder, private cache:CacheService, private auth:AuthService, public appSettings:AppSettings) {

      this.router = router;
      this.form = fb.group({
          'email': ['', Validators.compose([Validators.required, CustomValidators.email])],
          'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
      });

      this.email = this.form.controls['email'];
      this.password = this.form.controls['password'];
  }

  public onSubmit(values:Object):void {
      if (this.form.valid) {          
        this.auth.login(this.form.value.email, this.form.value.password).then((res)=>{
            if(res!=null)
            {
                this.cache.setToken(res.token, res.expire);
                let user = this.cache.getUser();
                if(user!=null)
                {
                    if(user.type!="admin")
                        this.router.navigate(['/prayerlist']);
                    else
                        this.router.navigate(['']);
                }
            }
            else
            {
                this.bGotError = true;
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
