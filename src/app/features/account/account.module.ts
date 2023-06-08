import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AccountRoutingModule } from './account.route';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AccountAppComponent } from './account.app.component';
import { AccountService } from './services/account.service';
import { NarikCustomValidatorsModule } from '@narik/custom-validators';
import { TranslateModule } from '@ngx-translate/core';
import { AccountGuard } from './services/account.guard';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AccountAppComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NarikCustomValidatorsModule,
    TranslateModule,
    NgxSpinnerModule,
  ],
  providers: [
    AccountService,
    AccountGuard
  ]
})
export class AccountModule { }
