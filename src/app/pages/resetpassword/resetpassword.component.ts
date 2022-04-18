import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import {CacheService, AuthService } from '../../core/service';
import { AppSettings } from 'src/app/app.settings';

@Component({
  selector: 'app-login',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResetpasswordComponent  implements OnInit{
  public router: Router;
  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public confirmPassword:AbstractControl;

  bSuccess = false;
  bGotError:boolean = false;
  errorMsg = '';
  hashId :string='';

  constructor(router:Router, private activatedRoute: ActivatedRoute, fb:FormBuilder, private cache:CacheService, private auth:AuthService
              ,public appSettings:AppSettings) {

      // appSettings.settings.theme.skin = "blue";
      // jQuery('.wrapper-inner').css("background-color", "white");      
      this.router = router;
      let password = new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]));
      let confirmPassword = new FormControl('', Validators.compose([Validators.required, CustomValidators.equalTo(password)]));
      this.form = fb.group({          
          'hash' : '',
          'email': ['', Validators.compose([Validators.required, CustomValidators.email])],
          'password': password,
          'confirmPassword': confirmPassword,
      });
      this.email = this.form.controls['email'];
      this.password = this.form.controls['password'];      
      this.confirmPassword = this.form.controls['confirmPassword'];
  }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(params => {
      this.hashId = params['id'];
      this.form.patchValue({
        hash: this.hashId
      });
    });    
  }


  public onSubmit():void {
      if (this.form.valid) {
        this.auth.resetpassword(this.form.value).then((res)=>{
            if(res)
            {
              this.bGotError = false;
              this.bSuccess = true;
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
