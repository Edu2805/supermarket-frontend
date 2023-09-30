import { Component, Input } from "@angular/core";
import { OtherAddition } from "../../other-addition/model/other-addition";

@Component({
    selector: 'other-addition-list',
    templateUrl: './other-addition-list.component.html'
})
export class OtherAdditionListComponent {

    @Input()
    otherAddition: OtherAddition;
    errors: any[] = [];
}