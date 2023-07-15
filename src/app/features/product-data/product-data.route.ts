import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductDataComponent } from "./product-data.component";
import { ReadProductDataComponent } from "./crud/read-product-data/read-product-data.component";
import { ProductDataGuardService } from "./services/product-data.guard";
import { CreateProductDataComponent } from "./crud/create-product-data/create-product-data.component";
import { UpdateProductDataComponent } from "./crud/update-product-data/update-product-data.component";
import { ProductDataResolve } from "./services/product-data.resolve";
import { DetailsProductDataComponent } from "./crud/details-product-data/details-product-data.component";
import { DeleteProductDataComponent } from "./crud/delete-product-data/delete-product-data.component";

const productDataRouterConfig: Routes = [
    {
        path: '', component: ProductDataComponent,
        children: [
            { 
                path: 'getAll', component: ReadProductDataComponent,
                canDeactivate: [ProductDataGuardService],
                canActivate: [ProductDataGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD']
                } 
            },
            {
                path: 'new', component: CreateProductDataComponent,
                canDeactivate: [ProductDataGuardService],
                canActivate: [ProductDataGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD']
                }
            },
            {
                path: 'edit/:id', component: UpdateProductDataComponent,
                canActivate: [ProductDataGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD']
                },
                resolve: {
                    product: ProductDataResolve
                }
            },
            { 
                path: 'details/:id', component: DetailsProductDataComponent,
                canActivate: [ProductDataGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD']
                },
                resolve: {
                    product: ProductDataResolve
                }
            },
            {
                path: 'delete/:id', component: DeleteProductDataComponent,
                canActivate: [ProductDataGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD']
                },
                resolve: {
                    product: ProductDataResolve
                }
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(productDataRouterConfig)
    ],
    exports: [RouterModule]
})
export class ProductDataRoutingModule{}