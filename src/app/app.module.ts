import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ToastrModule } from 'ngx-toastr';
import { PipesModule } from './theme/pipes/pipes.module';

import { routing } from './app.routing';
import { AppSettings } from './app.settings';

import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { HeaderComponent } from './theme/components/header/header.component';
import { FooterComponent } from './theme/components/footer/footer.component';
import { SidebarComponent } from './theme/components/sidebar/sidebar.component';
import { VerticalMenuComponent } from './theme/components/menu/vertical-menu/vertical-menu.component';
import { HorizontalMenuComponent } from './theme/components/menu/horizontal-menu/horizontal-menu.component';
import { BreadcrumbComponent } from './theme/components/breadcrumb/breadcrumb.component';
import { BackTopComponent } from './theme/components/back-top/back-top.component';
import { FullScreenComponent } from './theme/components/fullscreen/fullscreen.component';
import { ApplicationsComponent } from './theme/components/applications/applications.component';
import { MessagesComponent } from './theme/components/messages/messages.component';
import { UserMenuComponent } from './theme/components/user-menu/user-menu.component';
import { FlagsMenuComponent } from './theme/components/flags-menu/flags-menu.component';
import { SideChatComponent } from './theme/components/side-chat/side-chat.component';
import { BlankComponent } from './pages/blank/blank.component';
import { SearchComponent } from './pages/search/search.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { DemoComponent } from './pages/demo/demo.component';
import { PrayerListComponent } from './pages/prayerlist/prayerlist.component';
import { MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule } from '@angular/material';
import { PaygrowComponent } from './pages/demo/paygrow/paygrow.component';
import { BuyseedComponent } from './pages/buyseed/buyseed.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularWebStorageModule } from 'angular-web-storage';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecoverpasswordComponent } from './pages/recoverpassword/recoverpassword.component';
import { ResetpasswordComponent } from './pages/resetpassword/resetpassword.component';
import { ContactusComponent } from './pages/contactus/contactus.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HomeComponent } from './pages/home/home.component';
import { VideosComponent } from './pages/videos/videos.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { EditorComponent } from './pages/admin/editor/editor.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { VideomanComponent } from './pages/admin/videoman/videoman.component';
import { UsermanComponent } from './pages/admin/userman/userman.component';
import { WhatisComponent } from './pages/whatis/whatis.component';


@NgModule({  
  imports: [
    MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule,    
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    CKEditorModule,
    ReactiveFormsModule,    
    PerfectScrollbarModule,
    NgbModule,
    HttpClientModule,
    AngularWebStorageModule,    

    NgxPaginationModule,

    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAir4tXhx3X-wcdZnhe8TLlo9J2m_AKx6w'
    }),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    ToastrModule.forRoot(), 
    PipesModule,

    routing
  ],
  declarations: [
    AppComponent,
    PagesComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    VerticalMenuComponent,
    HorizontalMenuComponent,
    BreadcrumbComponent,
    BackTopComponent,
    FullScreenComponent,
    ApplicationsComponent,
    MessagesComponent,
    UserMenuComponent,
    FlagsMenuComponent,
    SideChatComponent,    
    BlankComponent,
    SearchComponent,
    NotFoundComponent,
    DemoComponent,
    PrayerListComponent,
    PaygrowComponent,
    BuyseedComponent,
    LoginComponent,
    RegisterComponent,
    RecoverpasswordComponent,
    ResetpasswordComponent,
    ContactusComponent,
    HomeComponent,
    VideosComponent,
    LogoutComponent,
    EditorComponent,
    VideomanComponent,
    UsermanComponent,
    WhatisComponent
  ],
  entryComponents:[
    PaygrowComponent
  ],
  providers: [ 
    AppSettings,
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
