import { Component, OnInit, AfterViewInit, Input, Output } from '@angular/core';


declare var $ : any;
declare var md : any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $(function() {
      md.initDashboardPageCharts();
    });
  }

  callMe() {
    alert('yes! >>from dashboard >> its now calling...');
  }

}
