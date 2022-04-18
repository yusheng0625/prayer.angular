import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CacheService, AdminService } from 'src/app/core/service';

@Component({
  selector: 'app-videoman',
  templateUrl: './videoman.component.html',
  styleUrls: ['./videoman.component.scss']
})
export class VideomanComponent implements OnInit {

  id:number = -1;
  editinglink:string="";
  link:string="";
  videos:any[]=[];
  p:any;  
  constructor(private router:Router, private cache:CacheService, private adminApi:AdminService) { 
    let user = this.cache.getUser();
    if(user==null || user.type!="admin")
    {
      this.router.navigate(['/']);
      return;
    }
    
    let svc = this;
    this.adminApi.get_videos(this.cache.getToken()).then(res=>{
      if(res!=null)
      {
        svc.videos = res;
      }
    })
  }

  ngOnInit() {
  }

  onEdit(id)
  {
    this.id = -1;
    for(let i=0; i<this.videos.length; i++)
    {
      if(this.videos[i].Id == id)
      {
        this.editinglink = this.videos[i].link;
        this.link = this.videos[i].link;
        this.id = id;
      }
    }
  }

  onAddNew()
  {
    let svc = this;
    this.adminApi.add_new_video(this.cache.getToken(), this.editinglink).then(res=>{
      if(res!=null)
      {
        svc.videos.push(res);
        this.editinglink = "";
        this.link = "";
        this.id = -1;
      }
    })
  }
  onSave()
  {
    let svc = this;
    this.adminApi.update_video(this.cache.getToken(), this.id, this.editinglink).then(res=>{
      if(res)
      {
        for(let i=0; i<svc.videos.length; i++)
        {
          if(this.videos[i].Id == svc.id)
          {
            this.videos[i].link = this.editinglink;
            this.editinglink = "";
            this.link = "";
            this.id = -1;    
          }
        }        
      }
    })
  }

  onRemove(id)
  {
    let svc = this;
    this.adminApi.remove_video(this.cache.getToken(), id).then(res=>{
      if(res)
      {
        for(let i=0; i<svc.videos.length; i++)
        {
          if(this.videos[i].Id == svc.id)
          {
            this.videos.splice(i,1);
            this.editinglink = "";
            this.link = "";
            this.id = -1;
          }
        }
      }
    })
  }

}
