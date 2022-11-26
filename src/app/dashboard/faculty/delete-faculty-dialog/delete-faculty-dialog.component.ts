import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { FacultyService } from "../../../shared/services/faculty.service";
import { ToastrService } from "ngx-toastr";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { catchError, of, take } from "rxjs";

@Component({
  selector: 'app-delete-faculty-dialog',
  templateUrl: './delete-faculty-dialog.component.html',
  styleUrls: ['./delete-faculty-dialog.component.scss']
})
export class DeleteFacultyDialogComponent {

  constructor(
    private fb: FormBuilder,
    private facultyService: FacultyService,
    private toastrService: ToastrService,
    private dialogRef: MatDialogRef<DeleteFacultyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) { }

  confirmDelete(): void {
    this.facultyService.deleteFaculty(this.data.id)
      .pipe(
        take(1),
        catchError(err => {
          this.toastrService.error(err.message);
          return of('');
        })
      )
      .subscribe(() => {
        this.dialogRef.close();
      })
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
