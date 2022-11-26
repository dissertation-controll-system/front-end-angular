import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AppUserResponseDTO } from "../../../shared/interfaces/app-user-dto.interface";
import { take } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { ProfileEditComponent } from "../profile-edit/profile-edit.component";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent {

  userData: AppUserResponseDTO;

  constructor(
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private dialog: MatDialog,
  ) {
    this.activatedRoute.data
      .pipe(take(1))
      .subscribe(({ userData }) => {
        this.userData = userData;
      });
  }

  openEditProfileDialog() {
    const dialogRef = this.dialog.open(ProfileEditComponent, {
      data: this.userData,
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.userData = response;
        this.toastrService.success('Інформацію про користувача успішно змінено')
      } else {
        this.toastrService.info('Редагування даних відмінено')
      }
    })
  }

}
