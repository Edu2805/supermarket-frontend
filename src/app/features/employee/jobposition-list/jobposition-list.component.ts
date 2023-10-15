import { Component, Input } from "@angular/core";
import { JobPosition } from "../../jobposition/model/jobposition";

@Component({
    selector: 'jobposition-list',
    templateUrl: './jobposition-list.component.html'
})
export class JobPositionListComponent {

    @Input()
    jobPosition: JobPosition;
    errors: any[] = [];
}