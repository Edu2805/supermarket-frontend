import { Component, Input } from "@angular/core";
import { environment } from "src/environments/environment";
import { PersonScholarityTypeStringDto } from "../../person/model/person-scholarity-type-string-dto";

@Component({
    selector: 'person-list',
    styleUrls: ['./person-list.component.scss'],
    templateUrl: './person-list.component.html'
})
export class PersonListComponent {

    @Input()
    person: PersonScholarityTypeStringDto;
    errors: any[] = [];
    id: any = '';
    images: string = environment.imagesUrl;
    defaultId: string = 'cf3f50ba-9d26-46a0-a711-dae2be2a101c';

    accordion(id: any) {
        if (this.id == id) {
          this.id = '';
        } else {
          this.id = id;
        }
      }

    fillTitlePersonDetails(): string {
        if(this.person !== undefined && this.person !== null && 
          this.person?.middleName !== undefined && this.person?.middleName !== null) {
    
          return `${this.person?.firstName} ${this.person?.middleName} ${this.person?.lastName}`
    
        } else if(this.person !== undefined && this.person !== null && 
          this.person?.middleName === undefined || this.person?.middleName === null) {
    
          return `${this.person?.firstName} ${this.person?.lastName}`
          
        }
        return "";
      }
}