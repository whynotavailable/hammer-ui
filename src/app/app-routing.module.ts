import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {TestCreateComponent} from "./test-create/test-create.component";
import {TestResultsComponent} from "./test-results/test-results.component";


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'test/create', component: TestCreateComponent },
  { path: 'results/:id', component: TestResultsComponent },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
