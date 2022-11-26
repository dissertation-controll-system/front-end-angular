import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, Validators } from "@angular/forms";
import { AppUserResponseDTO, AppUserUpdateDTO } from "../../../shared/interfaces/app-user-dto.interface";
import { AppUserService } from "../../../shared/services/app-user.service";
import { catchError, of, take } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent {

  profileEditForm = this.fb.group({
    firstName: [this.data.firstName, Validators.required],
    lastName: [this.data.lastName, Validators.required],
    fathersName: [this.data.fathersName, Validators.required],
    type: [this.data.type]
  })

  constructor(
    private fb: FormBuilder,
    private appUserService: AppUserService,
    private toastrService: ToastrService,
    private dialogRef: MatDialogRef<ProfileEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AppUserResponseDTO
  ) { }

  submitEdit(): void {
    this.appUserService.updateCurrentUserInfo(this.data.id, this.profileEditForm.value as AppUserUpdateDTO)
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
