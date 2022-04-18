import { Component, OnInit } from '@angular/core';
import { CacheService, PrayerService } from 'src/app/core/service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {

  p:any;
  videos:string[] = [
    // 'https://www.youtube.com/embed/Gt4rV9zjHQw',
    // 'https://www.youtube.com/embed/Gt4rV9zjHQw',
    // 'https://www.youtube.com/embed/Gt4rV9zjHQw',
    // 'https://www.youtube.com/embed/Gt4rV9zjHQw',
    // 'https://www.youtube.com/embed/Gt4rV9zjHQw',
    // 'https://www.youtube.com/embed/Gt4rV9zjHQw',
    // 'https://www.youtube.com/embed/Gt4rV9zjHQw',
    // 'https://www.youtube.com/embed/Gt4rV9zjHQw',
    // 'https://www.youtube.com/embed/Gt4rV9zjHQw',
    // 'https://www.youtube.com/embed/Gt4rV9zjHQw',
    // 'https://www.youtube.com/embed/Gt4rV9zjHQw',
    // 'https://www.youtube.com/embed/Gt4rV9zjHQw'
  ];
  constructor(private cache:CacheService, private prayerApi:PrayerService) { 

    let svc = this;
    this.prayerApi.get_videos(this.cache.getToken()).then(res=>{
      if(res!=null)
      {
        svc.videos = res;
      }
    });    
  }

  ngOnInit() {
  }

}
