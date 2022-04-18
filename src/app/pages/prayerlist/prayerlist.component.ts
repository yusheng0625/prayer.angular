import { Component, OnInit } from '@angular/core';
import { Config } from 'src/app/core/Config';
import { Router } from '@angular/router';
import { PrayerState } from 'src/app/core/model';
import { CacheService, PrayerService} from 'src/app/core/service';

@Component({
  selector: 'app-prayerlist',
  templateUrl: './prayerlist.component.html',
  styleUrls: ['./prayerlist.component.scss']
})
export class PrayerListComponent implements OnInit {

  searchText:string='';
  details:any[];
  states:PrayerState[] = [];
  type:string='grid';
  p:any;

  constructor(private router:Router, private cache:CacheService, private prayerApi:PrayerService) 
  { 
    let user = this.cache.getUser();
    if(user==null)
    {
      this.router.navigate(['/login']);
    }
    else
    {
      let svc = this;
      this.prayerApi.gets(this.cache.getToken()).then(res=>{
        if(res==null)
        {
        }else{
          this.states = res;
          for(let i=0; i<this.states.length; i++)
          {
            this.states[i].percent = 100 * this.states[i].step / 6;
            this.states[i].percentStyle = this.states[i].percent + "%";
            if(this.states[i].step == 6)
              this.states[i].full_grown = true;
            else
              this.states[i].full_grown = false;
          }
        }
      })
    }
    // this.details = [
    // {
    //   prayer:"This is test!",
    //   bkg_img:"../../../assets/img/demo/class2/bkg.png",
    //   images:[
    //     "../../../assets/img/demo/class2/0.png",
    //     "../../../assets/img/demo/class2/1.png",
    //     "../../../assets/img/demo/class2/2.png",
    //     "../../../assets/img/demo/class2/3.png",
    //     "../../../assets/img/demo/class2/4.png",
    //     "../../../assets/img/demo/class2/5.png",
    //   ]
    // }];    
  }

  toggle(type)
  {
    this.type= type;
  }

  ngOnInit() {

  }


  onPlay(id)
  {
    let state = null;
    for(let i=0; i<this.states.length; i++)
    {
      if(id==this.states[i].Id)
      {
        state = this.states[i];
        break;
      }
    }
    if(state==null) return;

    this.cache.setPrayer(JSON.stringify(state));
    this.router.navigate(['/grow']);
  }

}
