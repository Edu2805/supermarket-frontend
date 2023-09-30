import { Component, Input } from "@angular/core";
import { OtherDiscount } from "../../other-discount/model/other-discount";

@Component({
    selector: 'other-discount-list',
    templateUrl: './other-discount-list.component.html'
})
export class OtherDiscountListComponent {

    @Input()
    otherDiscount: OtherDiscount;
    errors: any[] = [];
}