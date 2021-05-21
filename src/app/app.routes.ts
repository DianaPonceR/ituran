import { RouterModule } from "@angular/router";
import { HomeComponent } from "./Components/home/home.component";
import { Step0Component } from "./Components/SubscribeNow/step0-Inicial/step0.component";
import { Step1Component } from "./Components/SubscribeNow/step1-User/step1.component";
import { Step21Component } from "./Components/SubscribeNow/step2-Cotizaciones/step21.component";
import { Step2Component } from "./Components/SubscribeNow/step2-Vehiculo/step2.component";
import { Step3Component } from "./Components/SubscribeNow/step3-Confirm/step3.component";
import { Step4Component } from "./Components/SubscribeNow/step4-Factura/step4.component";
import { Step5Component } from "./Components/SubscribeNow/step5-Pago/step5.component";
import { Step6Component } from "./Components/SubscribeNow/step6/step6.component";
import { SubscribeNowComponent } from "./Components/SubscribeNow/subscribe-now/subscribe-now.component";

const appRoutes = [
    { path: 'home', component: HomeComponent,  pathMatch: 'full'},
    { path: 'cliente', component: Step1Component,  pathMatch: 'full'},
    { path: 'cotizacion', component: Step21Component,  pathMatch: 'full'},
    { path: 'vehiculo', component: Step2Component,  pathMatch: 'full'},
    { path: 'factura', component: Step4Component,  pathMatch: 'full'},
    { path: 'confirmacion', component: Step3Component,  pathMatch: 'full'},
    { path: 'pago', component: Step5Component,  pathMatch: 'full'},
    { path: 'agenda', component: Step6Component,  pathMatch: 'full'},
    { path: '', redirectTo: 'home',  pathMatch: 'full'},
    { path: '**', component: HomeComponent }
  ];

  export const routing = RouterModule.forRoot(appRoutes);