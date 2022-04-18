import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { CacheService, PrayerService } from 'src/app/core/service';

@Component({
  selector: 'app-buyseed',
  templateUrl: './buyseed.component.html',
  styleUrls: ['./buyseed.component.scss']
})
export class BuyseedComponent implements OnInit {

  prayer:string="";
  bError:boolean = false;
  placeholder:string="Type in Your Prayer To Jesus Here.";

  constructor(private router:Router, private cache:CacheService, private paryerApi: PrayerService) 
  { 
    let userInfo = this.cache.getUser();
    if(userInfo==null)
    {
      this.router.navigate(['']);
    }
  }

  ngOnInit() {
    this.loadStripe();
  }  

  onFocus(){
    this.placeholder = "";
  }
  onFocusOut(){
    if(this.prayer=="")
      this.placeholder = "Type in Your Prayer To Jesus Here.";
  }


  loadStripe() {      
    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      window.document.body.appendChild(s);
    }
  } 

  pay(amount) {    
    let svc = this;
    var handler = (<any>window).StripeCheckout.configure({
        //key: 'pk_test_96Woa6B83OShaLqWWWTLykzW',
        key:"pk_live_HtjQzmZiL9636ykM6bgBuG7w",
        locale: 'auto',
        token: function (token: any) {
        // // You can access the token ID with `token.id`.
        // // Get the token ID to your server-side code for use.
        // console.log(token)
        // alert('Token Created!!');
            svc.confirm();
        }
    });
    
    // <a href="">By Signing Up, You agree to the Terms and Privacy Policy</a>
    handler.open({
        name: 'MiracleOfJesus.com',
        description: '$5.00 for getting seed.',
        amount: amount * 100
    });    
  }



  onBuySeed()
  {
    if(this.prayer=="")
    {
      this.bError = true;
      return;
    }
    this.pay(5);
  }

  confirm()
  {
    let svc =this;
    this.paryerApi.buy_seed(this.cache.getToken(), this.prayer).then(res=>{      
      if(res!=null)
      {
        svc.cache.setPrayer(JSON.stringify(res));
        svc.router.navigate(['/grow']);
      }
    });
  }

}
