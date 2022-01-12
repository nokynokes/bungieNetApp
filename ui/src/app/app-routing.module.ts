import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { AuthComponent } from './auth/auth.component';
import { HomeResolver } from './home/home.resolver';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "auth", component: AuthComponent },
  { path: "home", 
    loadChildren: () => 
      import("./home/home.module").then((m) => m.HomeModule),
    canActivate: [AuthGuardService],
    resolve: { data: HomeResolver },
  },
  { path: "", 
    loadChildren: () => 
      import("./home/home.module").then((m) => m.HomeModule),
    canActivate: [AuthGuardService],
    resolve: { data: HomeResolver },
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
