import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { LoginComponent } from './login/login.component';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { RouterSerializer } from './ngrx/store/router.serializer';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({
      router: routerReducer
    }),
    StoreRouterConnectingModule.forRoot({
      serializer: RouterSerializer
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
