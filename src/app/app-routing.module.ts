import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent, data: { animation: 'LoginPage' } },
  { path: 'register-user', component: SignUpComponent, data: { animation: 'RegisterPage' }  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
    //AuthGard
  },
  { path: 'forgot-password', component: ForgotPasswordComponent, data: { animation: 'ForgotPasswordPage' }  },
  { path: 'verify-email-address', component: VerifyEmailComponent, data: { animation: 'VerifyEamilPage' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
