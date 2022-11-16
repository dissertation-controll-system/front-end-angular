import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from './container/dashboard.component';
import { SharedModule } from "../shared/shared.module";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonToggleModule } from "@angular/material/button-toggle";



@NgModule({
  declarations: [
    ProfileInfoComponent,
    DashboardComponent,
    ProfileEditComponent
  ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        SharedModule,
        MatCardModule,
        MatButtonModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonToggleModule
    ]
})
export class DashboardModule { }
