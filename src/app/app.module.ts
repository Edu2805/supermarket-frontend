import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './features/employee/employee.component';
import { EstablishmentComponent } from './features/establishment/establishment.component';
import { GoodsissueComponent } from './features/goodsissue/goodsissue.component';
import { GoodsreceiptComponent } from './features/goodsreceipt/goodsreceipt.component';
import { JobpositionComponent } from './features/jobposition/jobposition.component';
import { MainsectionComponent } from './features/mainsection/mainsection.component';
import { PersonComponent } from './features/person/person.component';
import { ProductDataComponent } from './features/product-data/product-data.component';
import { SalaryComponent } from './features/salary/salary.component';
import { SubsectionComponent } from './features/subsection/subsection.component';
import { UserDataComponent } from './features/user-data/user-data.component';
import { HomeComponent } from './features/home/home.component';
import { DepartmentComponent } from './features/department/department.component';

@NgModule({
  declarations: [
    AppComponent,
    DepartmentComponent,
    EmployeeComponent,
    EstablishmentComponent,
    GoodsissueComponent,
    GoodsreceiptComponent,
    JobpositionComponent,
    MainsectionComponent,
    PersonComponent,
    ProductDataComponent,
    SalaryComponent,
    SubsectionComponent,
    UserDataComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
