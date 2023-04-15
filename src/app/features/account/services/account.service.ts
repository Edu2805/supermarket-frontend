import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserData } from "../models/user-data";

@Injectable()
export class AccountService { 
    
    constructor(private http: HttpClient) {}

    registerUser(user: UserData) {

    }

    login(user: UserData) {
        
    }
 }