import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule} from "@angular/common/http";
import { TestCreateComponent } from './test-create/test-create.component';
import {FormsModule} from "@angular/forms";
import { TestResultsComponent } from './test-results/test-results.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TestCreateComponent,
    TestResultsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
