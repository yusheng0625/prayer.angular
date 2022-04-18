import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CacheService } from 'src/app/core/service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(router:Router, private cache:CacheService) {
    this.cache.clear();
    router.navigate(['']);    
   }

  ngOnInit() {
  }

}
