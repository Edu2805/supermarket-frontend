import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-person',
  template: '<router-outlet></router-outlet>'
})
export class PersonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
