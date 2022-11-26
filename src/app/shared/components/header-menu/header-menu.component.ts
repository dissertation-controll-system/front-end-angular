import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { AppState } from "../../interfaces/app-state.interface";
import { logout } from "../../../authentication/store/authentication.action";
import { AccountService } from "../../services/account.service";
import { map, Observable } from "rxjs";

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent {

  userName$: Observable<string> = this.accountService.getCurrentAccount()
    .pipe(map((account) => account.username));

  constructor(
    private store: Store<AppState>,
    private accountService: AccountService
  ) { }

  logout(): void {
    this.store.dispatch(logout());
  }

}
