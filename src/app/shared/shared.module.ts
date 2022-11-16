import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from "@angular/material/sidenav";
import { SideMenuComponent } from "./components/side-menu/side-menu.component";
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule } from "@angular/router";
import { ToastrModule } from "ngx-toastr";

@NgModule({
  declarations: [SideMenuComponent, HeaderMenuComponent],
  exports: [
    SideMenuComponent,
    HeaderMenuComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    ToastrModule.forRoot()
  ]
})
export class SharedModule {}
