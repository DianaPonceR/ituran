import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ProgressBarComponent implements OnInit {
  @Input() currentStep: number
  constructor() { }

  ngOnInit(): void {
  }
  getBackgroundColor(circleIndex: number): string {

    var color : string;

    return circleIndex <= this.currentStep ? '#80b447' : '#479acd';

    switch(circleIndex) {
      case 1:
        color = this.currentStep > 1 ? '#80b447' : '#479acd';
        break;
      case 2:
        color = this.currentStep > 3 ? '#80b447' : '#479acd';
        break;
      case 3:
        color = this.currentStep > 4 ? '#80b447' : '#479acd';
        break;
      case 4:
        color = this.currentStep > 5 ? '#80b447' : '#479acd';
        break;
      case 5:
        color = this.currentStep > 6 ? '#80b447' : '#479acd';
        break;
      case 6:
        color = this.currentStep > 7 ? '#80b447' : '#479acd';
        break;
      default:
        color = '#479acd';
        break;
    }
    return color;
  }

}
