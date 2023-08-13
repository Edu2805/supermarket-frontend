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
import { DetailsUserComponent } from './crud/details-user/details-user.component';
import { AccountResolve } from './services/account.resolver';
import { PipeModule } from 'src/app/utils/pipe/pipe.module';

@NgModule({
  declarations: [
    AccountAppComponent,
    RegisterComponent,
    LoginComponent,
    DetailsUserComponent
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
    PipeModule
  ],
  providers: [
    AccountService,
    AccountGuard,
    AccountResolve
  ]
})
export class AccountModule { }
