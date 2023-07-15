import { Component, Input } from "@angular/core";
import { MainSection } from "../../mainsection/model/mainsection";
import { Provider } from "../../provider/model/provider";

@Component({
    selector: 'provider-product-list',
    templateUrl: './provider-product-list.component.html'
})
export class ProviderProductListComponent {

    @Input()
    provider: Provider;
    errors: any[] = [];
}