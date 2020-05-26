import { Component, OnInit } from '@angular/core';
import {TestService} from "../test.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  tests: any[]

  constructor(private testService: TestService) { }

  ngOnInit(): void {
    this.testService.getClients().subscribe(x => {
      this.tests = x;
    })
  }

}
