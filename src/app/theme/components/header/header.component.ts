import { Component, OnInit, ViewEncapsulation, HostListener, Input } from '@angular/core';
import { trigger,  state,  style, transition, animate } from '@angular/animations';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { MenuService } from '../menu/menu.service';
import { CacheService } from 'src/app/core/service';
import { UserInfo } from 'src/app/core/model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ MenuService ],
  animations: [
    trigger('showInfo', [
      state('1' , style({ transform: 'rotate(180deg)' })),
      state('0', style({ transform: 'rotate(0deg)' })),
      transition('1 => 0', animate('400ms')),
      transition('0 => 1', animate('400ms'))
    ])
  ]
})
export class HeaderComponent implements OnInit {
  public showHorizontalMenu:boolean = true; 
  public showInfoContent:boolean = false;
  public settings: Settings;
  public menuItemsLogined:Array<any>;
  public menuItemsLogoff:Array<any>;  

  public menuItemsAdmin:Array<any>;

  bAdmin:boolean = false;
  logined:boolean = false;
  userInfo:UserInfo;
  @Input() showFull:boolean = false;

  constructor(public appSettings:AppSettings, public menuService:MenuService,
    public cache:CacheService, private route:Router ) {
      this.settings = this.appSettings.settings;
      this.menuItemsLogined = this.menuService.getMenuItemsLogined();
      this.menuItemsLogoff = this.menuService.getMenuItemsLogoff();            
      this.menuItemsAdmin = this.menuService.getMenuItemsAdmin();
  }
  
  ngOnInit() {
    if(window.innerWidth <= 1054 || this.showFull==false) 
      this.showHorizontalMenu = false;

      setInterval(() => {
        this.userInfo = this.cache.getUser();      
        if(this.userInfo!=null)
        {
          if(this.logined==false)
          {
            this.logined = true;
            if(this.userInfo.type=="admin")
              this.bAdmin = true;
            else
              this.bAdmin = false;
          }            
        }
        else {
          this.logined = false;
          this.bAdmin = false;
          // jQuery('.main-content').removeClass("show-setting");
        }
      },200);      
  }

  onLogOut(){
    this.cache.clear();
    this.route.navigate(['']);
  }


  public closeSubMenus(){
    let menu = document.querySelector("#menu0"); 
    if(menu){
      for (let i = 0; i < menu.children.length; i++) {
          let child = menu.children[i].children[1];
          if(child){          
              if(child.classList.contains('show')){            
                child.classList.remove('show');
                menu.children[i].children[0].classList.add('collapsed'); 
              }             
          }
      }
    }
  }

  @HostListener('window:resize')
  public onWindowResize():void {
     if(window.innerWidth <= 1054 || this.showFull==false){
        this.showHorizontalMenu = false;
     }      
      else{
        this.showHorizontalMenu = true;
      }
  }
  
}
