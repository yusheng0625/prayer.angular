import { Injectable } from '@angular/core';
import { Settings } from './app.settings.model';

@Injectable()
export class AppSettings {
    public settings = new Settings(
        'StartNG',
        'Angular Admin Template with Bootstrap 4',
        {
            menu: 'horizontal', //horizontal , vertical
            //menuType: 'default', //default, compact, mini
            menuType: 'default', //default, compact, mini
            //showMenu: true,
            showMenu: false,
            navbarIsFixed: true,
            footerIsFixed: true,
            sidebarIsFixed: true,
            showSideChat: false,
            sideChatIsHoverable: true,
            skin:'blue'  //light , dark, blue, green, combined, purple, orange, brown, grey, pink
        }
    )
}