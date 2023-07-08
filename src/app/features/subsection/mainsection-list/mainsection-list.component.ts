import { Component, Input } from "@angular/core";
import { MainSection } from "../../mainsection/model/mainsection";

@Component({
    selector: 'mainsection-list',
    templateUrl: './mainsection-list.component.html'
})
export class MainsectionListComponent {

    @Input()
    mainsection: MainSection;
    errors: any[] = [];
}