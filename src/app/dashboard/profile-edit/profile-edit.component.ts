import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, Validators } from "@angular/forms";
import { AppUserResponseDTO, AppUserUpdateDTO } from "../../shared/interfaces/app-user-dto.interface";
import { AppUserService } from "../../shared/services/app-user.service";
import { take } from "rxjs";

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

  profileEditForm = this.fb.group({
    firstName: [this.data.firstName, Validators.required],
    lastName: [this.data.lastName, Validators.required],
    fathersName: [this.data.fathersName, Validators.required],
    type: [this.data.type]
  })

  constructor(
    private fb: FormBuilder,
    private appUserService: AppUserService,
    private dialogRef: MatDialogRef<ProfileEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AppUserResponseDTO
  ) { }

  ngOnInit(): void {
  }

  submitEdit(): void {
    this.appUserService.updateCurrentUserInfo(this.data.id, this.profileEditForm.value as AppUserUpdateDTO)
      .pipe(take(1))
      .subscribe(response => {
        this.dialogRef.close(response);
      })
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
