import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./authentication/auth.module').then((m) => m.AuthModule)
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
