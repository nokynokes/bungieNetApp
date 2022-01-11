import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { LoginComponent } from './login/login.component';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { RouterSerializer } from './ngrx/store/router.serializer';
import { AppState } from './ngrx/types';
import { AuthComponent } from './auth/auth.component';
import { EffectsModule } from '@ngrx/effects';
import { tokenStateReducer } from './ngrx/reducers/token-state.reducer';
import { AppEffects } from './ngrx/effects/app.effects';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AuthComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot<AppState>({
      router: routerReducer,
      tokenState: tokenStateReducer
    }),
    StoreRouterConnectingModule.forRoot({
      serializer: RouterSerializer
    }),
    EffectsModule.forRoot([AppEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
