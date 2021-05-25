import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxPageScrollCoreModule, EasingLogic } from "ngx-page-scroll-core";
import { HttpClientModule } from "@angular/common/http";
import { PipesModule } from "./pipes/pipes.module";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ChoosingComponent } from './choosing/choosing.component';
import { FoodCardComponent } from './food-card/food-card.component';
import { FoodListComponent } from './food-list/food-list.component';

import { FoodDb } from "./global";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChoosingComponent,
    FoodCardComponent,
    FoodListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxPageScrollCoreModule.forRoot({duration: 300}),
    PipesModule,
    FontAwesomeModule,
    FormsModule
  ],
  providers: [FoodDb],
  bootstrap: [AppComponent]
})
export class AppModule {
  
}
