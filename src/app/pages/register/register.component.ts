import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { AuthService, CacheService } from 'src/app/core/service';
import { UserInfo } from 'src/app/core/model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent {
    public router: Router;
    public form:FormGroup;
    public name:AbstractControl;
    public email:AbstractControl;
    public password:AbstractControl;
    public confirmPassword:AbstractControl;

    bError:boolean = false;
    errMsg:string = '';
    
    constructor(router:Router, fb:FormBuilder,private auth:AuthService, private cache:CacheService){
        this.router = router;
        this.form = fb.group({
            name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            email: ['', Validators.compose([Validators.required, emailValidator])],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required]
        },{validator: matchingPasswords('password', 'confirmPassword')});

        this.name = this.form.controls['name'];
        this.email = this.form.controls['email'];
        this.password = this.form.controls['password'];
        this.confirmPassword = this.form.controls['confirmPassword'];
    }

     public onSubmit(values:Object):void {
        if (!this.form.valid) return;

        let user = new UserInfo();
        user.name = this.form.value.name;
        user.email = this.form.value.email;
        user.password = this.form.value.password;

        this.auth.register(user).then(res=>
        {
            if(res)
            {
                this.cache.setToken(res.token, res.expire);
                let user = this.cache.getUser();
                if(user!=null)
                {
                    this.router.navigate(['/grow']);
                }
            }                
            else{
                this.bError = true;
                this.errMsg = this.auth._message;
            }
        });
    }

    ngAfterViewInit(){
        document.getElementById('preloader').classList.add('hide');
    }
}

export function emailValidator(control: FormControl): {[key: string]: any} {
    var emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;    
    if (control.value && !emailRegexp.test(control.value)) {
        return {invalidEmail: true};
    }
}

export function matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
        let password= group.controls[passwordKey];
        let passwordConfirmation= group.controls[passwordConfirmationKey];
        if (password.value !== passwordConfirmation.value) {
            return passwordConfirmation.setErrors({mismatchedPasswords: true})
        }
    }
}
