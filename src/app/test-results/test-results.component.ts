import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {combineLatest, Subscription} from "rxjs";
import {TestService} from "../test.service";
import {filter, first} from "rxjs/operators";

@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.scss']
})
export class TestResultsComponent implements OnInit, OnDestroy {
  id: string = ""
  private sub: Subscription;
  private streamSub: Subscription

  test: any = null
  results: any[] = []

  constructor(private route: ActivatedRoute, private testService: TestService) { }

  ngOnInit(): void {
    let s = this.route.params.pipe(first()).subscribe(params => {
      this.id = params["id"];
      this.testService.setLocation(`test:${this.id}`);
      this.loadInitialData();

      this.streamSub = this.testService.stream
        .pipe(filter(x => x.Type === 'results'))
        .subscribe(data => {
          // results come in on a per server basis.
          let d = data.Data
          let current = this.results.filter(x => x.ServerID === d.ServerID)

          if (current.length > 0) {
            current[0].Results = d.Results
          }
          else {
            this.results.push(d)
          }
        })
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.streamSub.unsubscribe();
    this.testService.setLocation(''); // clear the location
  }

  private loadInitialData() {
    this.sub = combineLatest([
      this.testService.getTest(this.id),
      this.testService.getResults(this.id)
    ]).subscribe(([test, results]) => {
      this.test = test;
      this.results = results;
    })
  }
}
