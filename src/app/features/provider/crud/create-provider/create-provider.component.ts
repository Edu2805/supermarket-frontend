import { Component, OnInit } from '@angular/core';
import { FormBaseComponent } from 'src/app/features/base-components/form-base.component';

@Component({
  selector: 'app-create-provider',
  templateUrl: './create-provider.component.html',
  styleUrls: ['./create-provider.component.scss']
})
export class CreateProviderComponent extends FormBaseComponent implements OnInit {

  ngOnInit(): void {

  }

}
