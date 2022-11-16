import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "./shared/guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./authentication/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
