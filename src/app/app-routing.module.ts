import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhoneLoginComponent } from './phone-login/phone-login.component';
const routes: Routes = [

	{path: 'home', component: PhoneLoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const  routingComponents = [PhoneLoginComponent]

