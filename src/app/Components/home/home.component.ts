import { Component, OnInit } from '@angular/core';
import { IturanApiService } from 'src/app/Services/ituran-api.service';
import { SessionService } from 'src/app/Services/session-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  token: string;
  constructor(private _ituranApi: IturanApiService) { }

  ngOnInit(): void {
  }
}
