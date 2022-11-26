import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { catchError, of, take } from "rxjs";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FacultyService } from "../../../shared/services/faculty.service";
import { FacultyResponseDTO } from "../../../shared/interfaces/faculty-dto.interface";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-edit-faculty-dialog',
  templateUrl: './edit-faculty-dialog.component.html',
  styleUrls: ['./edit-faculty-dialog.component.scss']
})
export class EditFacultyDialogComponent {

  facultyForm = this.fb.group({
    faculty: [this.data.name, Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private facultyService: FacultyService,
    private toastrService: ToastrService,
    private dialogRef: MatDialogRef<EditFacultyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FacultyResponseDTO
  ) { }

  submitEdit(): void {
    this.facultyService.editFaculty(this.data.id, this.facultyForm.controls['faculty'].value as string)
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
