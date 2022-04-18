import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CacheService, AdminService } from 'src/app/core/service';

@Component({
  selector: 'app-userman',
  templateUrl: './userman.component.html',
  styleUrls: ['./userman.component.scss']
})
export class UsermanComponent implements OnInit {

  users:any[]=[];
  p:any;  
  constructor(private router:Router, private cache:CacheService, private adminApi:AdminService) {
    let user = this.cache.getUser();
    if(user==null || user.type!="admin")
    {
      this.router.navigate(['/']);
      return;
    }
    let svc = this;
    this.adminApi.get_users(this.cache.getToken()).then(res=>{
      if(res!=null)
      {
        svc.users = res;
      }
    })    
   }

  ngOnInit() {
  }

}
