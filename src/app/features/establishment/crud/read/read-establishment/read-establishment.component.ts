import { Component, OnInit } from '@angular/core';
import { Establishment } from '../../../model/establishment';
import { EstablishmentService } from '../../../services/establishment.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-read-establishment',
  templateUrl: './read-establishment.component.html',
  styleUrls: ['./read-establishment.component.scss']
})
export class ReadEstablishmentComponent implements OnInit {

  public establishments: Establishment[];
  errorMessage: string;
  errors: any[] = [];

  constructor(private establishmentService: EstablishmentService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.establishmentService.getAllEstablishments()
    .subscribe(
      establishment => {
        this.establishments = establishment['content'],
        this.spinner.hide();
      },
      fail => { 
        this.processFail(fail) 
      }
    );
  }

  processFail(fail: any) {
    if (fail.error !== null && fail.error !== undefined) {
      this.errors = fail.error.errors;
    } else {
      this.errors = fail.message;
    }
    this.toastr.error(this.errors.toString(), 'Opa :(');
    this.spinner.hide();
  }
}

