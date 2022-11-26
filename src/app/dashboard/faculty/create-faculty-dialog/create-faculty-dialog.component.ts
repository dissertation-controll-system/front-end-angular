import { Component } from '@angular/core';
import { catchError, of, take } from "rxjs";
import { FormBuilder, Validators } from "@angular/forms";
import { FacultyService } from "../../../shared/services/faculty.service";
import { ToastrService } from "ngx-toastr";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-create-faculty-dialog',
  templateUrl: './create-faculty-dialog.component.html',
  styleUrls: ['./create-faculty-dialog.component.scss']
})
export class CreateFacultyDialogComponent {

  facultyForm = this.fb.group({
    faculty: ['', Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private facultyService: FacultyService,
    private toastrService: ToastrService,
    private dialogRef: MatDialogRef<CreateFacultyDialogComponent>,
  ) { }

  submitEdit(): void {
    this.facultyService.createFaculty(this.facultyForm.controls['faculty'].value as string)
      .pipe(
        take(1),
        catchError(err => {
          this.toastrService.error(err.message);
          return of('');
        })
      )
      .subscribe(response => {
        this.dialogRef.close(response);
      })
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
