import { Component, OnInit } from '@angular/core';
import { CacheService, AdminService } from 'src/app/core/service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  images:any[]=[];
  p:any;
  link:any;
  image:any;

  top:any = "";
  left:any = "";
  right:any = "";
  foot:any = "";

  public config0:any;  
  public config1:any;
  public config2:any;
  constructor(private router:Router, private cache:CacheService, private adminApi:AdminService) 
  {
    this.config0 = {
      uiColor: '#F0F3F4',
      height: '100',
      extraPlugins: 'divarea',
      toolbarGroups :[
          { name: 'clipboard', groups: [ 'undo' ] },
          { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
          { name: 'basicstyles', groups: [ 'basicstyles'] },
          { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi'] },
          '/',
          { name: 'links', groups: [ 'links' ] },
          { name: 'insert', groups: [ 'insert' ] },          
          { name: 'styles', groups: [ 'styles' ] },
          { name: 'colors', groups: [ 'colors' ] },
        ]
    };

    this.config1 = {
      uiColor: '#F0F3F4',
      height: '450',
      extraPlugins: 'divarea',
      toolbarGroups :[
          { name: 'clipboard', groups: [ 'undo' ] },
          { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
          { name: 'basicstyles', groups: [ 'basicstyles'] },
          { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi'] },
          '/',
          { name: 'links', groups: [ 'links' ] },
          { name: 'insert', groups: [ 'insert' ] },          
          { name: 'styles', groups: [ 'styles' ] },
          { name: 'colors', groups: [ 'colors' ] },
        ]
    };

    this.config2 = {
      uiColor: '#F0F3F4',
      height: '200',
      extraPlugins: 'divarea',
      toolbarGroups :[
          { name: 'clipboard', groups: [ 'undo' ] },
          { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
          { name: 'basicstyles', groups: [ 'basicstyles'] },
          { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi'] },
          '/',
          { name: 'links', groups: [ 'links' ] },
          { name: 'insert', groups: [ 'insert' ] },          
          { name: 'styles', groups: [ 'styles' ] },
          { name: 'colors', groups: [ 'colors' ] },
        ]
    };


    let user = this.cache.getUser();
    if(user==null || user.type!="admin")
    {
      this.router.navigate(['/']);
      return;
    }

    let svc = this;
    this.adminApi.get_home_contents(this.cache.getToken()).then(res=>{
      if(res!=null)
      {
        svc.top = res.home_top;
        svc.left = res.home_left;
        svc.right = res.home_right;
        svc.foot = res.home_foot;
      }
    })

    this.adminApi.get_images(this.cache.getToken()).then(res=>{
      if(res!=null)
      {
        svc.images = res;
      }
    })
  }



  ngOnInit() {
  }
  onChangeTop(event: any) {
    setTimeout(() => {
      this.top = event;
    });
  }
  onChangeLeft(event: any) {
    setTimeout(() => {
      this.left = event;
    });
  }
  onChangeRight(event: any) {
    setTimeout(() => {
      this.right = event;
    });
  }
  onChangeFoot(event: any) {
    setTimeout(() => {
      this.foot = event;
    });
  }

  onUpdate()
  {
    let contents = [
      {name:'home_top', value:this.top},
      {name:'home_left', value:this.left},
      {name:'home_right', value:this.right},
      {name:'home_foot', value:this.foot},
    ];

    this.adminApi.put_home_contents(this.cache.getToken(), contents).then(res=>{
      if(res)
      {
        this.router.navigate(['/']);
      }
    })
  }


  onView(id)
  {
    for(let i=0; i<this.images.length; i++)
    {
      if(this.images[i].Id == id)
      {
        this.link = this.images[i].link;
        this.image = "";
      }
    }
  }

  onAddNew()
  {
    let svc = this;
    this.adminApi.put_image(this.cache.getToken(), this.image).then(res=>{
      if(res!=null)
      {
        svc.images.push(res);
        this.image = '';
        this.link = '';
      }
    })
  }

  fileChange(input){
    const reader = new FileReader();
    if (input.files.length) {
        const file = input.files[0];
        reader.onload = () => {
            this.image = reader.result;
            this.link = this.image;
        }
        reader.readAsDataURL(file);
    }
  }


  onRemove(id)
  {
    let svc = this;
    this.adminApi.remove_image(this.cache.getToken(), id).then(res=>{
      if(res)
      {
        for(let i=0; i<svc.images.length; i++)
        {
          if(this.images[i].Id == id)
          {
            this.images.splice(i,1);
            this.image="";
            this.link = "";
          }
        }
      }
    })
  }

}
