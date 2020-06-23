import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';

const authRoutes: Routes = [
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
]

@NgModule({
    imports:[
        [RouterModule.forChild(authRoutes)]
    ],
    exports: [
        [RouterModule]
    ]
})
export class AuthRoutingModule{ }