import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common'
import { AppComponent } from './app.component';
import { routing } from './app.routes';
import { HeaderComponent } from './Components/Static/header/header.component';
import { HomeComponent } from './Components/home/home.component';
import { FooterComponent } from './Components/Static/footer/footer.component';
import { WelcomeBannerComponent } from './Components/Static/welcome-banner/welcome-banner.component';
import { LeadComponent } from './Components/lead/lead.component';
import { GoToComponent } from './Components/Static/go-to/go-to.component';
import { GeneralComponent } from './Components/Static/general/general.component';
import { PlansComponent } from './Components/Static/plans/plans.component';
import { AppAddComponent } from './Components/Static/app-add/app-add.component';
import { SliderComponent } from './Components/Static/slider/slider.component';
import { HowToPayComponent } from './Components/Static/how-to-pay/how-to-pay.component';
import { WhatNextComponent } from './Components/Static/what-next/what-next.component';
import { YtVideoComponent } from './Components/Static/yt-video/yt-video.component';
import { FaqComponent } from './Components/Static/faq/faq.component';
import { SummaryComponent } from './Components/Static/summary/summary.component';
import { Step0Component } from './Components/SubscribeNow/step0-Inicial/step0.component';
import { Step1Component } from './Components/SubscribeNow/step1-User/step1.component';
import { Step4Component } from './Components/SubscribeNow/step4-Factura/step4.component';
import { Step5Component } from './Components/SubscribeNow/step5-Pago/step5.component';
import { Step6Component } from './Components/SubscribeNow/step6/step6.component';
import { SubscribeNowComponent } from './Components/SubscribeNow/subscribe-now/subscribe-now.component';
import { ProgressBarComponent } from './Components/SubscribeNow/progress-bar/progress-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Step2Component } from './Components/SubscribeNow/step2-Vehiculo/step2.component';
import { Step3Component } from './Components/SubscribeNow/step3-Confirm/step3.component';
import { Step21Component } from './Components/SubscribeNow/step2-Cotizaciones/step21.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProcesoFinalizadoComponent } from './Components/SubscribeNow/proceso-finalizado/proceso-finalizado.component';
import { RouterModule } from '@angular/router';
import { AlphabetOnlyDirective } from './Helpers/alphabet-only.directive';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CotizacionBodyComponent } from './Components/SubscribeNow/cotizacion-body/cotizacion-body.component';
import { WelcomeSliderComponent } from './Components/Static/welcome-slider/welcome-slider.component';

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
    SummaryComponent,
    Step0Component,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component,
    Step5Component,
    Step6Component,
    SubscribeNowComponent,
    ProgressBarComponent,
    Step21Component,
    ProcesoFinalizadoComponent,
    AlphabetOnlyDirective,
    CotizacionBodyComponent,
    WelcomeSliderComponent
  ],
  imports: [
    BrowserModule,
    routing,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    DigitOnlyModule,
    BrowserAnimationsModule
  ],
  providers: [DatePipe, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
