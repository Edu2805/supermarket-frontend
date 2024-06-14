import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable, fromEvent, merge } from 'rxjs';
import { FormBaseComponent } from 'src/app/features/base-components/form-base.component';
import { JobPosition } from 'src/app/features/jobposition/model/jobposition';
import { JobPositionService } from 'src/app/features/jobposition/services/jobposition.service';
import { Person } from 'src/app/features/person/model/person';
import { PersonService } from 'src/app/features/person/services/person.service';
import { SubSection } from 'src/app/features/subsection/model/subsection';
import { SubsectionService } from 'src/app/features/subsection/services/subsection.service';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { Employee } from '../../model/employee';
import { EmployeeService } from '../../services/employee.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss']
})
export class UpdateEmployeeComponent extends FormBaseComponent implements OnInit {

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
  vaidateDocument: any;
  formResult: string= '';
  images: string = environment.imagesUrl;
  defaultId: string = 'cf3f50ba-9d26-46a0-a711-dae2be2a101c';
  
  constructor(private fb: FormBuilder,
    private employeeService: EmployeeService,
    private personService: PersonService,
    private subSectionService: SubsectionService,
    private jobPositionService: JobPositionService,
    private router: Router,
    private route: ActivatedRoute,
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

    this.employee = this.route.snapshot.data['employee'];
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
    this.fillForm();
    this.updateSelectedPerson(this.employee?.person);
    this.updateSelectedSubsection(this.employee?.subSection);
    this.updateSelectedJobPosition(this.employee?.jobPosition);
  }

  fillForm() {
    this.employeeForm.patchValue({
      person: {
        idPerson: this.employee?.person.id
      },
      subSection: {
        idSubsection: this.employee?.subSection.id,
      },
      jobPosition: {
        idJobposition: this.employee?.jobPosition.id
      }
    });
    this.spinner.hide();
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
    this.personService.getAllPeopleAvaiable().subscribe((response) => {
      this.people = response;
    },(error: any) => {
      if (error && error.errors) {
        this.toastr.error(this.translateService.instant(error.errors));
      }
      this.toastr.error(this.translateService.instant('br_com_supermarket_EMPLOYEE_AN_ERROR_OCCURRED_WHILE_GET_PEOPLE'));
    });
  }

  getSubSection() {
    this.subSectionService.getAllSubsections().subscribe((response) => {
      this.subSections = response;
    },(error: any) => {
      if (error && error.errors) {
        this.toastr.error(this.translateService.instant(error.errors));
      }
      this.toastr.error(this.translateService.instant('br_com_supermarket_EMPLOYEE_AN_ERROR_OCCURRED_WHILE_GET_SUB_SECTIONS'));
    });
  }

  getJobPosition() {
    this.jobPositionService.getAllJobPositionsAvaiable().subscribe((response) => {
      this.jobPositions = response;
    },(error: any) => {
      if (error && error.errors) {
        this.toastr.error(this.translateService.instant(error.errors));
      }
      this.toastr.error(this.translateService.instant('br_com_supermarket_EMPLOYEE_AN_ERROR_OCCURRED_WHILE_GET_JOB_POSITIONS'));
    });
  }

  updateEmployee() {
    
    if (this.employeeForm.dirty && this.employeeForm.valid) {
      this.spinner.show();
      this.employee = Object.assign({}, this.employee, this.employeeForm.value);
      this.employee.person.id = this.employeeForm.get('person').get('idPerson').value;
      this.employee.subSection.id = this.employeeForm.get('subSection').get('idSubsection').value;
      this.employee.jobPosition.id = this.employeeForm.get('jobPosition').get('idJobposition').value;
      this.employeeService.updateEmployee(this.employee)
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
        this.translateService.instant('br_com_supermarket_EMPLOYEE_EDIT_SUCCESS'), 
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
