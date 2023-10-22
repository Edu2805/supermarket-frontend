import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { FormBaseComponent } from 'src/app/features/base-components/form-base.component';
import { Employee } from '../../model/employee';
import { Person } from 'src/app/features/person/model/person';
import { SubSection } from 'src/app/features/subsection/model/subsection';
import { JobPosition } from 'src/app/features/jobposition/model/jobposition';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { EmployeeService } from '../../services/employee.service';
import { PersonService } from 'src/app/features/person/services/person.service';
import { SubsectionService } from 'src/app/features/subsection/services/subsection.service';
import { JobPositionService } from 'src/app/features/jobposition/services/jobposition.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, fromEvent, merge } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  employeeForm: FormGroup;
  employee: Employee;
  people: Person[];
  subSections: SubSection[];
  jobPositions: JobPosition[];
  localStorageUtils = new LocalStorageUtils();
  selectedPerson: any;
  selectedSubsection: any;
  selectedJobPosition: any;
  images: string = environment.imagesUrl;
  defaultId: string = 'cf3f50ba-9d26-46a0-a711-dae2be2a101c';

  vaidateDocument: any;

  formResult: string= '';
  
  constructor(private fb: FormBuilder,
    private employeeService: EmployeeService,
    private personService: PersonService,
    private subSectionService: SubsectionService,
    private jobPositionService: JobPositionService,
    private router: Router,
    private spinner: NgxSpinnerService,
    protected override translateService: TranslateService,
    protected override toastr: ToastrService,) {

    super(toastr, translateService);

    this.validationMessages = {
      idPerson: {
        required: this.translateService.instant('br_com_supermarket_EMPLOYEE_PERSON_REQUIRED_MESSAGE'),
      },
      idSubsection: {
        required: this.translateService.instant('br_com_supermarket_EMPLOYEE_SUB_SECTION_REQUIRED_MESSAGE'),
      },
      idJobposition: {
        required: this.translateService.instant('br_com_supermarket_EMPLOYEE_JOB_POSITION_REQUIRED_MESSAGE'),
      }
    };
    super.messageConfigValidatorBase(this.validationMessages);
  }

  ngOnInit() {
    this.getPeople();
    this.getSubSection();
    this.getJobPosition();
    this.employeeForm = this.fb.group({
      person: this.fb.group({
        idPerson: ['', Validators.required]
      }),
      subSection: this.fb.group({
        idSubsection: ['', Validators.required]
      }),
      jobPosition: this.fb.group({
        idJobposition: ['', Validators.required]
      })
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidators.proccessMenssage(this.employeeForm);
    })
    super.formConfigValidatorsBase(this.formInputElements, this.employeeForm);
  }

  getPeople() {
    this.spinner.show();
    this.personService.getAllPeopleAvaiable().subscribe((response) => {
      this.people = response;
      this.spinner.hide();
    },(error: any) => {
      this.spinner.hide();
      if (error && error.errors) {
        this.toastr.error(this.translateService.instant(error.errors));
      }
      this.toastr.error(this.translateService.instant('br_com_supermarket_EMPLOYEE_AN_ERROR_OCCURRED_WHILE_GET_PEOPLE'));
    });
  }

  getSubSection() {
    this.spinner.show();
    this.subSectionService.getAllSubsections().subscribe((response) => {
      this.subSections = response['content'];
      this.spinner.hide();
    },(error: any) => {
      this.spinner.hide();
      if (error && error.errors) {
        this.toastr.error(this.translateService.instant(error.errors));
      }
      this.toastr.error(this.translateService.instant('br_com_supermarket_EMPLOYEE_AN_ERROR_OCCURRED_WHILE_GET_SUB_SECTIONS'));
    });
  }

  getJobPosition() {
    this.spinner.show();
    this.jobPositionService.getAllJobPositionsAvaiable().subscribe((response) => {
      this.jobPositions = response;
      this.spinner.hide();
    },(error: any) => {
      this.spinner.hide();
      if (error && error.errors) {
        this.toastr.error(this.translateService.instant(error.errors));
      }
      this.toastr.error(this.translateService.instant('br_com_supermarket_EMPLOYEE_AN_ERROR_OCCURRED_WHILE_GET_JOB_POSITIONS'));
    });
  }

  addEmployee() {
    
    if (this.employeeForm.dirty && this.employeeForm.valid) {
      this.spinner.show();
      this.employee = Object.assign({}, this.employee, this.employeeForm.value);
      this.employee.person.id = this.employeeForm.get('person').get('idPerson').value;
      this.employee.subSection.id = this.employeeForm.get('subSection').get('idSubsection').value;
      this.employee.jobPosition.id = this.employeeForm.get('jobPosition').get('idJobposition').value;
      this.employeeService.newEmployee(this.employee)
        .subscribe(
          success => { this.processSuccess(success) },
          fail => { this.processFail(fail) }
        );
    }
  }

  processSuccess(response: any) {
    this.employeeForm.reset();
    this.errors = [];
    this.unsaveChanges = false;

    let toast = this.toastr.success(
        this.translateService.instant('br_com_supermarket_EMPLOYEE_NEW_SUCCESS'), 
        this.translateService.instant('br_com_supermarket_MSG_GENERIC_SUCCESS'));
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.spinner.hide();
        this.router.navigate(['/employee/getAll'])
      });
    }
  }

  processFail(fail: any) {
    if (fail.error !== null && fail.error !== undefined) {
      this.errors = fail.error.errors;
    } else {
      if (fail.status === 403) {
        this.errors = [this.translateService.instant('br_com_supermarket_LOGIN_AN_ERROR_OCCURRED_EXPIRED_LOGIN')];
        this.localStorageUtils.clearUserLocationData();
        this.router.navigate(['/account/login']);
      } else {
        this.errors = fail.message;
      }
    }
    this.toastr.error(this.errors.toString(), this.translateService.instant('br_com_supermarket_MSG_ERROR'));
    this.spinner.hide();
  }

  updateSelectedPerson(person: any) {
    this.selectedPerson = person;
  }

  updateSelectedSubsection(subsection: any) {
    this.selectedSubsection = subsection;
  }

  updateSelectedJobPosition(jobPosition: any) {
    this.selectedJobPosition = jobPosition;
  }

  findSelectedPerson() {
    const idPerson = this.employeeForm.get('person.idPerson').value;
    return this.people.find(p => p.id === idPerson);
  }

  findSelectedSubSection() {
    const idSubsection = this.employeeForm.get('subSection.idSubsection').value;
    return this.subSections.find(p => p.id === idSubsection);
  }

  findSelectedJobPosition() {
    const idJobposition = this.employeeForm.get('jobPosition.idJobposition').value;
    return this.jobPositions.find(p => p.id === idJobposition);
  }
}
