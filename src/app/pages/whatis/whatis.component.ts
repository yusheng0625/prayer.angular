import { Component, OnInit } from '@angular/core';
import { CacheService } from 'src/app/core/service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-whatis',
  templateUrl: './whatis.component.html',
  styleUrls: ['./whatis.component.scss']
})
export class WhatisComponent implements OnInit {

  constructor(private cache:CacheService, private router:Router) {
    this.cache.setWhatisThis();
    this.router.navigate(['/']);
   }

  ngOnInit() {
  }

}
