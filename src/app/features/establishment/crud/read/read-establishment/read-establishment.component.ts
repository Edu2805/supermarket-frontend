import { Component, OnInit } from '@angular/core';
import { Establishment } from '../../../model/establishment';
import { EstablishmentService } from '../../../services/establishment.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Page } from 'src/app/utils/pagination/model/models';

@Component({
  selector: 'app-read-establishment',
  templateUrl: './read-establishment.component.html',
  styleUrls: ['./read-establishment.component.scss']
})
export class ReadEstablishmentComponent implements OnInit {

  public establishments: Array<Establishment> = [];
  public page: Page<Establishment>;
  PAGE = 0;
  SIZE = 10;
  errorMessage: string;
  errors: any[] = [];

  constructor(private establishmentService: EstablishmentService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllPaged(this.PAGE, this.SIZE);
  }

  getAllPaged(page, size) {
    this.spinner.show();
    this.establishmentService.getAllEstablishmentsPaged(page, size)
    .subscribe(
      establishment => {
        this.page = establishment;
        this.establishments = this.page['content'];
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

  changePage(event){
    this.getAllPaged(event.page, event.size);
   }
}

