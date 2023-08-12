import { Injectable } from "@angular/core";
import { Person } from "../model/person";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { PersonService } from "./person.service";

@Injectable()
export class PersonResolve implements Resolve<Person> {

    constructor(private personService: PersonService) {}

    resolve(route: ActivatedRouteSnapshot) {
        return this.personService.findPersonById(route.params['id']);
    }
    
}