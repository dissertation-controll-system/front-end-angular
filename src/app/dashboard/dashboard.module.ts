import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileInfoComponent } from './profile/profile-info/profile-info.component';
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from './container/dashboard.component';
import { SharedModule } from "../shared/shared.module";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { FacultyTableComponent } from './faculty/faculty-table/faculty-table.component';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatIconModule } from "@angular/material/icon";
import { CreateFacultyDialogComponent } from './faculty/create-faculty-dialog/create-faculty-dialog.component';
import { EditFacultyDialogComponent } from './faculty/edit-faculty-dialog/edit-faculty-dialog.component';
import { DeleteFacultyDialogComponent } from './faculty/delete-faculty-dialog/delete-faculty-dialog.component';



@NgModule({
  declarations: [
    ProfileInfoComponent,
    DashboardComponent,
    ProfileEditComponent,
    FacultyTableComponent,
    CreateFacultyDialogComponent,
    EditFacultyDialogComponent,
    DeleteFacultyDialogComponent
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
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatIconModule
  ]
})
export class DashboardModule { }
