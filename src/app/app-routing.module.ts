import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './navigation/home/home.component';

const routes: Routes = [
        {
                path: '', redirectTo: '/home', pathMatch: 'full'
        },
        {
                path: 'home', component: HomeComponent
        },
        {
                path: 'department',
                loadChildren: () => import('./features/department/department.module')
                        .then(m => m.DepartmentModule)
        },
        {
                path: 'employee',
                loadChildren: () => import('./features/employee/employee.module')
                        .then(m => m.EmployeeModule)
        },
        {
                path: 'establishment',
                loadChildren: () => import('./features/establishment/establishment.module')
                        .then(m => m.EstablishmentModule)
        },
        {
                path: 'goods-issue',
                loadChildren: () => import('./features/goodsissue/goodsissue.module')
                        .then(m => m.GoodsissueModule)
        },
        {
                path: 'goods-receipt',
                loadChildren: () => import('./features/goodsreceipt/goodsreceipt.module')
                        .then(m => m.GoodsreceiptModule)
        },
        {
                path: 'jobposition',
                loadChildren: () => import('./features/jobposition/jobposition.module')
                        .then(m => m.JobpositionModule)
        },
        {
                path: 'main-section',
                loadChildren: () => import('./features/mainsection/mainsection.module')
                        .then(m => m.MainsectionModule)
        },
        {
                path: 'sub-section',
                loadChildren: () => import('./features/subsection/subsection.module')
                        .then(m => m.SubsectionModule)
        },
        {
                path: 'person',
                loadChildren: () => import('./features/person/person.module')
                        .then(m => m.PersonModule)
        },
        {
                path: 'product-data',
                loadChildren: () => import('./features/product-data/product-data.module')
                        .then(m => m.ProductDataModule)
        },
        {
                path: 'salary',
                loadChildren: () => import('./features/salary/salary.module')
                        .then(m => m.SalaryModule)
        },
        {
                path: 'user-data',
                loadChildren: () => import('./features/user-data/user-data.module')
                        .then(m => m.UserDataModule)
        }
];

@NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
})
export class AppRoutingModule { }
