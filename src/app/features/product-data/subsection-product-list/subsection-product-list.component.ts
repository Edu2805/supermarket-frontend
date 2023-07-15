import { Component, Input } from "@angular/core";
import { SubSection } from "../../subsection/model/subsection";

@Component({
    selector: 'subsection-product-list',
    templateUrl: './subsection-product-list.component.html'
})
export class SubsectionProductListComponent {

    @Input()
    subsection: SubSection;
    errors: any[] = [];
}