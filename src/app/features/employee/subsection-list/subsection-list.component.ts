import { Component, Input } from "@angular/core";
import { SubSection } from "../../subsection/model/subsection";

@Component({
    selector: 'subsection-list',
    templateUrl: './subsection-list.component.html'
})
export class SubSectionListComponent {

    @Input()
    subsection: SubSection;
    errors: any[] = [];
}