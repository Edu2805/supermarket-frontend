import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { PersonComponent } from "./person.component";
import { PersonRoutingModule } from "./person.route";
import { TranslateModule } from "@ngx-translate/core";
import { CreatePersonComponent } from './crud/create-person/create-person.component';
import { UpdatePersonComponent } from './crud/update-person/update-person.component';
import { DeletePersonComponent } from './crud/delete-person/delete-person.component';
import { ReadPersonComponent } from './crud/read-person/read-person.component';
import { DetailsPersonComponent } from './crud/details-person/details-person.component';
import { PersonGuardService } from "./services/person.guard";
import { PersonResolve } from "./services/person.resolve";
import { PersonService } from "./services/person.service";

@NgModule({
    declarations:[
        PersonComponent,
        CreatePersonComponent,
        UpdatePersonComponent,
        DeletePersonComponent,
        ReadPersonComponent,
        DetailsPersonComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        PersonService,
        PersonGuardService,
        PersonResolve
    ],
    imports:[
        CommonModule,
        PersonRoutingModule,
        TranslateModule
    ],
    exports:[]
})
export class PersonModule{}