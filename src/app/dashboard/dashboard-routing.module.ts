import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { ProfileInfoComponent } from "./profile-info/profile-info.component";
import { DashboardComponent } from "./container/dashboard.component";
import { ProfileInfoResolver } from "./resolvers/profile-info.resolver";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '**',
        redirectTo: 'profile-info',
        pathMatch: "full"
      },
      {
        path: 'profile-info',
        component: ProfileInfoComponent,
        resolve: {
          userData: ProfileInfoResolver
        }
      }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
