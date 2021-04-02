import { RouterModule } from "@angular/router";
import { HomeComponent } from "./Components/home/home.component";

const appRoutes = [
    { path: 'home', component: HomeComponent,  pathMatch: 'full'},
    { path: '**', component: HomeComponent }
  ];

  export const routing = RouterModule.forRoot(appRoutes);