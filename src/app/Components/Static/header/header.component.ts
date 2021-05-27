import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/Services/user-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom 
})
export class HeaderComponent implements OnInit {

  constructor(public _userDataService: UserDataService) { }

  ngOnInit(): void {
  }

  goHome(){
    this.finalizar();
  }

  finalizar() {
    this._userDataService.clearSession();
    this._userDataService.goToForm('inicial');
  }


}
