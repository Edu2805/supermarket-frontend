import { Component, Input } from "@angular/core";
import { Establishment } from "../../establishment/model/establishment";

@Component({
    selector: 'establishment-list',
    templateUrl: './establishment-list.component.html'
})
export class EstablishmentListComponent {

    @Input()
    establishment: Establishment;
    errors: any[] = [];
}