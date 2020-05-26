import { Component, OnInit } from '@angular/core';

import { v4 } from 'uuid'
import {TestService} from "../test.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-test-create',
  templateUrl: './test-create.component.html',
  styleUrls: ['./test-create.component.scss']
})
export class TestCreateComponent implements OnInit {
  length = 60
  virtualUsers = 1

  targets: any[] = []
  servers: any[] = []

  constructor(private testService: TestService, private router: Router) { }

  ngOnInit(): void {
    this.addTarget();
    this.testService.getServers().subscribe(servers => {
      this.servers = servers.map(x => ({
        id: x.ID,
        selected: true // TODO: change this to false before go live
      }))
    })
  }

  addTarget() {
    this.targets.push({
      id: v4(),
      uri: "http://localhost:8080/",
      method: "GET",
      headers: "",
      body: ""
    })
  }

  removeTarget(id) {
    this.targets = this.targets.filter(x => x.id !== id);
  }

  createTest() {
    console.log(this.virtualUsers)
    this.testService.createTest({
      length: this.length,
      virtualUsers: this.virtualUsers,
      targets: this.targets,
      servers: this.servers.filter(x => x.selected).map(x => x.id)
    }).subscribe(x => {
      this.router.navigateByUrl(`/results/${x.ID}`);
    })
  }
}
