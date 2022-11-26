import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { ProfileInfoComponent } from "./profile/profile-info/profile-info.component";
import { DashboardComponent } from "./container/dashboard.component";
import { ProfileInfoResolver } from "./resolvers/profile-info.resolver";
import { FacultyTableComponent } from "./faculty/faculty-table/faculty-table.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'profile-info',
        component: ProfileInfoComponent,
        resolve: {
          userData: ProfileInfoResolver
        }
      },
      {
        path: 'faculties',
        component: FacultyTableComponent,
      },
      {
        path: '**',
        redirectTo: 'profile-info',
        pathMatch: "full"
      },
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
