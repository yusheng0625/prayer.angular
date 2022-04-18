import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { PagesComponent } from './pages/pages.component';
import { BlankComponent } from './pages/blank/blank.component';
import { SearchComponent } from './pages/search/search.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { DemoComponent } from './pages/demo/demo.component';
import { PrayerListComponent } from './pages/prayerlist/prayerlist.component';
import { BuyseedComponent } from './pages/buyseed/buyseed.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecoverpasswordComponent } from './pages/recoverpassword/recoverpassword.component';
import { ResetpasswordComponent } from './pages/resetpassword/resetpassword.component';
import { ContactusComponent } from './pages/contactus/contactus.component';
import { HomeComponent } from './pages/home/home.component';
import { VideosComponent } from './pages/videos/videos.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { EditorComponent } from './pages/admin/editor/editor.component';
import { VideomanComponent } from './pages/admin/videoman/videoman.component';
import { UsermanComponent } from './pages/admin/userman/userman.component';
import { WhatisComponent } from './pages/whatis/whatis.component';

export const routes: Routes = [
  {
    path: '', 
    component: PagesComponent,
    children:[
      //{ path: '', loadChildren: './pages/dashboard/dashboard.module#DashboardModule', data: { breadcrumb: 'Dashboard' }  },          
      // { path: 'membership', loadChildren: './pages/membership/membership.module#MembershipModule', data: { breadcrumb: 'Membership' } },
      { path: '', component: HomeComponent, data: { breadcrumb: 'Home page' } },
      { path: 'whatis', component: WhatisComponent, data: { breadcrumb: 'Home page' } },
      { path: 'grow', component: DemoComponent, data: { breadcrumb: 'Demo page' } },
      { path: 'buyseed', component: BuyseedComponent, data: { breadcrumb: 'Buy seed' } },
      { path: 'prayerlist', component: PrayerListComponent, data: { breadcrumb: 'Prayer List' } },
      { path: 'videos', component: VideosComponent, data: { breadcrumb: 'Videos' } },
      //{ path: 'login', loadChildren: './pages/login/login.module#LoginModule' },
      //{ path: 'register', loadChildren: './pages/register/register.module#RegisterModule' },

      { path: 'login', component: LoginComponent, data: { breadcrumb: 'Login' } },
      { path: 'logout', component: LogoutComponent, data: { breadcrumb: 'Logout' } },
      { path: 'register', component: RegisterComponent, data: { breadcrumb: 'Register' } },
      { path: 'recoverpassword', component: RecoverpasswordComponent, data: { breadcrumb: 'Login' } },      
      { path: 'resetpassword', component: ResetpasswordComponent, data: { breadcrumb: 'Register' } },
      { path: 'contactus', component: ContactusComponent, data: { breadcrumb: 'Contact US' } },


      { path: 'editor', component: EditorComponent, data: { breadcrumb: 'Editor' } },
      { path: 'videoman', component: VideomanComponent, data: { breadcrumb: 'Video manager' } },
      { path: 'userman', component: UsermanComponent, data: { breadcrumb: 'User manager' } },      

      //{ path: '', component: DemoComponent, data: { breadcrumb: 'Demo page' } },
      //{ path: '', loadChildren: './pages/demo/demo.module#DemoModule', data: { breadcrumb: 'Demo page' } },
      // { path: 'demo', loadChildren: './pages/demo/demo.module#DemoModule', data: { breadcrumb: 'Demo page' } },

      

      // { path: 'ui', loadChildren: './pages/ui/ui.module#UiModule', data: { breadcrumb: 'UI' } },
      // { path: 'form-elements', loadChildren: './pages/form-elements/form-elements.module#FormElementsModule', data: { breadcrumb: 'Form Elements' } },
      // { path: 'tables', loadChildren: './pages/tables/tables.module#TablesModule', data: { breadcrumb: 'Tables' } },
      // { path: 'tools', loadChildren: './pages/tools/tools.module#ToolsModule', data: { breadcrumb: 'Tools' } },
      // { path: 'calendar', loadChildren: './pages/calendar/app-calendar.module#AppCalendarModule', data: { breadcrumb: 'Calendar' } },
      // { path: 'mailbox', loadChildren: './pages/mailbox/mailbox.module#MailboxModule', data: { breadcrumb: 'Mailbox' } },
      // { path: 'maps', loadChildren: './pages/maps/maps.module#MapsModule', data: { breadcrumb: 'Maps' } },
      // { path: 'charts', loadChildren: './pages/charts/charts.module#ChartsModule', data: { breadcrumb: 'Charts' } },
      // { path: 'dynamic-menu', loadChildren: './pages/dynamic-menu/dynamic-menu.module#DynamicMenuModule', data: { breadcrumb: 'Dynamic Menu' }  },  
      // { path: 'profile', loadChildren: './pages/profile/profile.module#ProfileModule', data: { breadcrumb: 'Profile' }  },         
      // { path: 'blank', component: BlankComponent, data: { breadcrumb: 'Blank page' } },
      // { path: 'search', component: SearchComponent, data: { breadcrumb: 'Search' } }
    ]
  }  
  // { path: 'login', loadChildren: './pages/login/login.module#LoginModule' },
  // { path: 'register', loadChildren: './pages/register/register.module#RegisterModule' },
  // { path: '**', component: NotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
   preloadingStrategy: PreloadAllModules,  // <- comment this line for enable lazy load
  // useHash: true
});