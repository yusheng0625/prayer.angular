import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CacheService, PrayerService } from 'src/app/core/service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  bGotContents:boolean = false;
  bWhatisThis:boolean = false;
  constructor(private router:Router, private cache:CacheService, private parayerApi:PrayerService) 
  {
    this.bWhatisThis = this.cache.getWhatisThis();
    this.cache.clearWhatisThis();
  }

  ngOnInit() {
    let svc = this;
    this.parayerApi.get_home_contents().then(res=>{
      if(res!=null)
      {
        jQuery("#home_toper").html(res.home_top);
        jQuery("#home_lefter").html(res.home_left);
        jQuery("#home_righter").html(res.home_right);
        jQuery("#home_footer").html(res.home_foot);
        this.bGotContents = true;

        if(this.bWhatisThis)
          jQuery('html, body').animate({scrollTop:document.body.scrollHeight}, {duration:200});
        // console.log("what'sthis" + this.bWhatisThis);
        // //jQuery('html, body').animate({scrollBottom:0}, {duration:200});
        // //if(this.bWhatisThis)
        // {
        //   setTimeout (() => {
        //     console.log("scroll bottom");
        //     //$("html, body").animate({ scrollTop: $(document).height() }, 1000);
        //     jQuery('html, body').animate({scrollTop:document.body.scrollHeight}, {duration:200});
        //   }, 200);          
        //   //window.scrollTo(0,document.body.scrollHeight);
        // }        
      }
    });
  }

  onGetPrayerSeed()
  {
    let user = this.cache.getUser();
    if(this.cache.getUser()==null)
    {
      this.router.navigate(['/login']);
    }
    else
    {
      if(user.type!="admin")
        this.router.navigate(['/buyseed']);
    }
  }

}
