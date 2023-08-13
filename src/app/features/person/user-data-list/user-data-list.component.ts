import { Component, Input } from "@angular/core";
import { UserData } from "../../account/models/user-data";

@Component({
    selector: 'user-data-list',
    templateUrl: './user-data-list.component.html'
})
export class UserDataListComponent {

    @Input()
    userData: UserData;
    errors: any[] = [];
}