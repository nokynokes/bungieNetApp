import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { ProfileComponent } from './components/profile/profile.component';
import { HomeEffects } from "./ngrx/effects/home.effects";
import { homeReducer } from "./ngrx/reducers/home.reducer";
import { CommonModule } from '@angular/common';


@NgModule({
    declarations: [
    ProfileComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: "",
                component: ProfileComponent
            }
        ]),
        StoreModule.forFeature("home", homeReducer),
        EffectsModule.forFeature([HomeEffects])
    ],
    providers: [],
})
export class HomeModule {}