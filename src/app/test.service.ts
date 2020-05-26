import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {filter, first} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TestService {
  socket: BehaviorSubject<WebSocket> = new BehaviorSubject<WebSocket>(null)

  stream: Subject<any> = new Subject<any>()

  constructor(private httpClient: HttpClient) {
    let ws = new WebSocket("ws://localhost:8085/ws");
    ws.onopen = (evt) => {
      this.socket.next(ws);
      console.log("OPEN", evt)
    }

    ws.onmessage = (evt) => {
      this.stream.next(JSON.parse(evt.data))
    }
  }

  setLocation(location) {
    this.socket
      // get the first non-null result and use that
      .pipe(filter(x => x !== null), first())
      .subscribe(socket => {
        socket.send(location)
      })
  }

  getClients(): Observable<any[]> {
    return this.httpClient.get<any[]>("http://localhost:8085/api/tests")
  }

  getServers(): Observable<any[]> {
    return this.httpClient.get<any[]>("http://localhost:8085/api/servers")
  }

  createTest(data): Observable<any> {
    // TODO: handle headers
    for(let target of data.targets) {
      target.headers = null;
    }

    return this.httpClient.post<any>('http://localhost:8085/api/test', data);
  }

  getTest(id: string): Observable<any> {
    return this.httpClient.get(`http://localhost:8085/api/test?test=${id}`)
  }

  getResults(id: string): Observable<any> {
    return this.httpClient.get(`http://localhost:8085/api/results?test=${id}`)
  }
}
