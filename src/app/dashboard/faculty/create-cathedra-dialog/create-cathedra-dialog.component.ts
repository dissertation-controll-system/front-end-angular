import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { FacultyService } from "../../../shared/services/faculty.service";
import { ToastrService } from "ngx-toastr";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { catchError, of, take } from "rxjs";
import { FacultyResponseDTO } from "../../../shared/interfaces/faculty-dto.interface";

@Component({
  selector: 'app-create-cathedra-dialog',
  templateUrl: './create-cathedra-dialog.component.html',
  styleUrls: ['./create-cathedra-dialog.component.scss']
})
export class CreateCathedraDialogComponent {

  cathedraForm = this.fb.group({
    cathedra: ['', Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private facultyService: FacultyService,
    private toastrService: ToastrService,
    private dialogRef: MatDialogRef<CreateCathedraDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FacultyResponseDTO
  ) { }

  submit(): void {
    this.facultyService.createCathedraToFaculty(this.data.id, this.cathedraForm.controls['cathedra'].value as string)
      .pipe(
        take(1),
        catchError(err => {
          this.toastrService.error(err.message);
          return of(null);
        })
      )
      .subscribe(() => {
        this.dialogRef.close({
          cathedraName: this.cathedraForm.controls['cathedra'].value as string,
          facultyName: this.data.name
        });
      })
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
