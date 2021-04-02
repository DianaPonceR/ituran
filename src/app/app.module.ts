import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { routing } from './app.routes';
import { HeaderComponent } from './Components/header/header.component';
import { HomeComponent } from './Components/home/home.component';
import { FooterComponent } from './Components/footer/footer.component';
import { WelcomeBannerComponent } from './Components/welcome-banner/welcome-banner.component';
import { LeadComponent } from './Components/lead/lead.component';
import { GoToComponent } from './Components/go-to/go-to.component';
import { GeneralComponent } from './Components/general/general.component';
import { PlansComponent } from './Components/plans/plans.component';
import { AppAddComponent } from './Components/app-add/app-add.component';
import { SliderComponent } from './Components/slider/slider.component';
import { HowToPayComponent } from './Components/how-to-pay/how-to-pay.component';
import { WhatNextComponent } from './Components/what-next/what-next.component';
import { YtVideoComponent } from './Components/yt-video/yt-video.component';
import { FaqComponent } from './Components/faq/faq.component';
import { SummaryComponent } from './Components/summary/summary.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    WelcomeBannerComponent,
    LeadComponent,
    GoToComponent,
    GeneralComponent,
    PlansComponent,
    AppAddComponent,
    SliderComponent,
    HowToPayComponent,
    WhatNextComponent,
    YtVideoComponent,
    FaqComponent,
    SummaryComponent
  ],
  imports: [
    BrowserModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
