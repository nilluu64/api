import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DemographicService } from './demographic.service';

@Component({
  selector: 'app-demographic',
  templateUrl: './demographic.component.html',
  styleUrls: ['./demographic.component.scss'],
})
export class DemographicComponent implements OnInit {
  registerForm: FormGroup;
  @Input() masterKeys: any;
  @Output() dataKey: EventEmitter<any> = new EventEmitter();

  option1 = true;
  option2 = false;
  UserKey:any;
  userkey:any;
  masterKey: any;
  key: any;
  file: any;
  primaryDoc: string = '';
  secondaryDoc: string = '';
  co_primaryDoc: string = '';
  co_secondaryDoc: string = '';
  addProof: string = '';


  parentIdentityPrimaryKey:any;

  agency = ['Agency101', 'Agency202', 'Agency303', 'Agency404'];
  states = ['State1', 'State2', 'State3', 'State4'];
  schooles = ['District1', 'District2', 'District3', 'District4'];
  primaryDocc = [
    'Driver License',
    'Government Issued Photo ID Card',
    'Military Photo ID Card',
    'Employer Issued Photo ID',
    'School Photo ID',
    'Passport',
    'Permanent Resident Card (Green Card)',
  ];
  co_primaryDocc = [
    'Driver License',
    'Government Issued Photo ID Card',
    'Military Photo ID Card',
    'Employer Issued Photo ID',
    'School Photo ID',
    'Passport',
    'Permanent Resident Card (Green Card)',
  ];
  secondaryDocc = [
    'High School Diploma, GED, or College Diploma',
    'Health Insurance Card or Prescription Card',
    'Printed Paystub',
    'Birth Certificate (applicant/co-applicant or child)',
    'Social Security Card',
  ];
  co_secondaryDocc = [
    'High School Diploma, GED, or College Diploma',
    'Health Insurance Card or Prescription Card',
    'Printed Paystub',
    'Birth Certificate (applicant/co-applicant or child)',
    'Social Security Card',
  ];
  racee = [
    'White/Caucasian',
    'Native American/Alaskan Native',
    'Asian',
    'Black/African American',
    'Native Hawaiian/Pacific islander',
    'Others',
  ];
  ethniCity = ['Hispanic/Latino', 'Non Hispanic/Latino'];
  genderr = ['Male', 'Female', 'Other'];
  dependentChildss = [
    'Childs Birth Certificate',
    'Court Decree ',
    'Custody Agreement or other court documents for guardianship ',
    'Most recent filed tax forms showing dependency ',
    'Health Insurance policy showing coverage for the dependent',
    'Records of school enrollment',
  ];
  dependentAdult = [
    'Childs Birth Certificate',
    'Court Decree ',
    'Custody Agreement or other court documents for guardianship',
  ];
  dependentAdult22 = [
    'Most recent filed tax forms showing dependency',
    'Health Insurance policy showing coverage for the dependent',
    'Records of school enrollment',
  ];
  relToChild = [
    'Father',
    'Mother',
    'Legally Resp. Adult',
    'Foster Parent',
    'Other',
  ];
  militaryStatus = [
    'No',
    'Active Duty US Military',
    'National Guard/Military Reserv',
  ];
  language = ['English', 'Spanish', 'Other'];
  addProoff = [
    'Current Rental/Lease Agreement',
    'Court Decree',
    'School Records Showing Residence',
    'Custody Agreement or other court documents for guardianship',
    'Home Utility Bills',
    'Medical Documentation',
    'Vehicle Registration/Title or NJ Drivers License',
    'Most Recent Filed Tax Forms Showing',
  ];

  total: Subscription;

  isVisible: any;
  isSelected: boolean = true;

  isVisible2: any;
  isSelected2: boolean = true;

  isChecked: boolean = false;

  submitted = false;
  sumOfNumber: number = 0;
  case2: boolean = false;
  caseAddress: boolean = false;
  homeAddress: FormGroup;
  homeless: FormGroup;
  isDisabled = false;

  isHomless: boolean = false;
  errData: any;
  primaryDocKey: any;
  secondaryDocKey: any = [];
  co_primaryDocKey: any;
  co_secondaryDocKey: any;
  addProofKey: any;
  dependantChild: string = 'Dependant Child';
  dependantChildKey: any;
  dependantAdultKey: any;
  dependantAdult: string = '';
  dependantAdultAgeProof: string = '';
  dependantAdultAgeProofKey: any;
  dependantchildproof: string = '';
  dependantadultproof: string = '';
  dependantadultAgeproof: string = '';
  errFile: any;
  dataToShow:any;




  parentIdentitySecondaryKey: any;
  dataPrimaryDoc: any = [];
  dataSecondaryDoc: any = [];
  parentIdentityCoPrimaryKey: any;
  coParentIdentityCoPrimaryKey: any;
  dataCoSecondaryDoc: any = [];
  dataCoPrimaryDoc: any = [];
  parentIdentityCoSecondaryKey: any;

  constructor(
    private formBuilder: FormBuilder,
    private demoService: DemographicService,
    private http: HttpClient
  ) {}

  // ngAfterViewInit() {
  //   this.dataKey.emit(this.masterKey);
  // }
  ngOnInit(): void {  
    // this.getDemoo();
    this.registerForm = this.formBuilder.group({
      line1: ['', Validators.required],
      line2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      school_district: ['', Validators.required],
      home_phone: [],
      cell_phone: [],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      addProof: [],
      mailingAdd: [],
      addProofFile: [],
      co_primaryDoc: [],
      co_secondaryDoc: [],
      type_referal: [],
      dates: [],
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      mi: [],
      ssn: ['', Validators.required],
      dob: ['', Validators.required],
      race: ['', Validators.required],
      ethnicity: ['', Validators.required],
      gender: ['', Validators.required],
      relationship_to_the_child: ['', Validators.required],
      co_lastname: ['', Validators.required],
      co_firstname: ['', Validators.required],
      co_mi: [],
      co_ssn: ['', Validators.required],
      co_dob: ['', Validators.required],
      co_race: ['', Validators.required],
      co_ethnicity: ['', Validators.required],
      co_gender: ['', Validators.required],
      co_relationship_to_the_child: ['', Validators.required],
      checkVal: [false],
      checkMailingVal: [false],
      m_line1: ['', Validators.required],
      m_line2: ['', Validators.required],
      m_city: ['', Validators.required],
      m_state: ['', Validators.required],
      m_zip: ['', Validators.required],
      m_school_district: ['', Validators.required],
      m_home_phone: [],
      m_cell_phone: [],
      m_email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      military_status: [],
      primary_language: ['', Validators.required],
      number_of_adults: ['', Validators.required],
      dependantchildproof: [],
      dependantadultproof: [],
      number_of_childran: ['', Validators.required],
      family_size: ['', Validators.required],
      total_family_size: [],
      primaryDoc: [],
      secondaryDoc: [],
      dependantadultAgeproof: [],
    });

    this.registerForm.get('checkVal')?.valueChanges.subscribe((ele) => {
      if (ele) {
        this.registerForm.get('line1')?.disable();
        this.registerForm.get('line2')?.disable();
        this.registerForm.get('city')?.disable();
        this.registerForm.get('state')?.disable();
        this.registerForm.get('zip')?.disable();
        this.registerForm.get('school_district')?.disable();
        this.registerForm.get('home_phone')?.disable();
        this.registerForm.get('cell_phone')?.disable();
        this.registerForm.get('email')?.disable();
        this.registerForm.get('mailingAdd')?.disable();
        this.registerForm.get('addProof')?.disable();
        this.registerForm.get('addProofFile')?.disable();
      } else {
        this.registerForm.get('line1')?.enable();
        this.registerForm.get('line2')?.enable();
        this.registerForm.get('city')?.enable();
        this.registerForm.get('state')?.enable();
        this.registerForm.get('zip')?.enable();
        this.registerForm.get('school_district')?.enable();
        this.registerForm.get('home_phone')?.enable();
        this.registerForm.get('cell_phone')?.enable();
        this.registerForm.get('email')?.enable();
        this.registerForm.get('mailingAdd')?.enable();
        this.registerForm.get('addProof')?.enable();
        this.registerForm.get('addProofFile')?.enable();
      }
      this.toggleButton();
    });

    this.registerForm.get('checkMailingVal')?.valueChanges.subscribe((ele2) => {
      if (ele2) {
        this.registerForm.get('m_line1')?.disable();
        this.registerForm.get('m_line2')?.disable();
        this.registerForm.get('m_city')?.disable();
        this.registerForm.get('m_state')?.disable();
        this.registerForm.get('m_zip')?.disable();
        this.registerForm.get('m_school_district')?.disable();
        this.registerForm.get('m_home_phone')?.disable();
        this.registerForm.get('m_cell_phone')?.disable();
        this.registerForm.get('m_email')?.disable();
      } else {
        this.registerForm.get('m_line1')?.enable();
        this.registerForm.get('m_line2')?.enable();
        this.registerForm.get('m_city')?.enable();
        this.registerForm.get('m_state')?.enable();
        this.registerForm.get('m_zip')?.enable();
        this.registerForm.get('m_school_district')?.enable();
        this.registerForm.get('m_home_phone')?.enable();
        this.registerForm.get('m_cell_phone')?.enable();
        this.registerForm.get('m_email')?.enable();
      }
    });
  }

  getprimaryDoc() {
    this.primaryDoc = this.primaryDoc;
  }

  submitPrimaryDoc(event: any) {
    this.file = event.target.files[0];
    console.log('file', this.file);
    if (this.primaryDoc) {
      var filedata = {
        description: this.primaryDoc,
      };
      var formdata = new FormData();
      formdata.append('file', this.file);
      formdata.append(
        'filedata',
        new Blob([JSON.stringify(filedata)], { type: 'application/json' })
      );

      this.http
        .post(
          'https://qvulllj0r2.execute-api.us-east-1.amazonaws.com/dhs/upload/addfile',
          formdata
        )
        .subscribe({
          next: (res) => {
            this.errData = res;
            console.log('errData', this.errData.UserKey);
            var Str = this.errData.UserKey;

            var newStr = Str.replace('userkey:', '');

            console.log('newstr', newStr);
            this.primaryDocKey = newStr;
          },
          error: (err) => {
          
          },
        });
    }
  }
  submitSecondaryDoc(event: any) {
    this.file = event.target.files[0];
    console.log('file', this.file);
    if (this.secondaryDoc) {
      var filedata = {
        description: this.secondaryDoc,
      };
      var formdata = new FormData();
      formdata.append('file', this.file);
      formdata.append(
        'filedata',
        new Blob([JSON.stringify(filedata)], { type: 'application/json' })
      );

      this.http
        .post(
          'https://qvulllj0r2.execute-api.us-east-1.amazonaws.com/dhs/upload/addfile',
          formdata
        )
        .subscribe({
          next: (res) => {
            this.errData = res;
            console.log('errData', this.errData.UserKey);
            var Str = this.errData.UserKey;

            var newStr = Str.replace('userkey:', '');

            console.log('newstr', newStr);
            this.secondaryDocKey = newStr;
          },
          error: (error) => {
        
          },
        });
    }
  }
  submitCoPrimaryDoc(event: any) {
    this.file = event.target.files[0];
    console.log('file', this.file);
    if (this.co_primaryDoc) {
      var filedata = {
        description: this.co_primaryDoc,
      };
      var formdata = new FormData();
      formdata.append('file', this.file);
      formdata.append(
        'filedata',
        new Blob([JSON.stringify(filedata)], { type: 'application/json' })
      );

      this.http
        .post(
          'https://qvulllj0r2.execute-api.us-east-1.amazonaws.com/dhs/upload/addfile',
          formdata
        )
        .subscribe({
          next: (data) => {
            console.log('Sucessss===>', data);
          },
          error: (error) => {
            this.errData = error;
            console.log('errData', this.errData.error.text);
            var Str = this.errData.error.text;

            var newStr = Str.replace('userkey:', '');

            console.log('newstr', newStr);
            this.co_primaryDocKey = newStr;
          },
        });
    }
  }
  submitCoSecondaryDoc(event: any) {
    this.file = event.target.files[0];
    console.log('file', this.file);
    if (this.co_secondaryDoc) {
      var filedata = {
        description: this.co_secondaryDoc,
      };
      var formdata = new FormData();
      formdata.append('file', this.file);
      formdata.append(
        'filedata',
        new Blob([JSON.stringify(filedata)], { type: 'application/json' })
      );

      this.http
        .post(
          'https://qvulllj0r2.execute-api.us-east-1.amazonaws.com/dhs/upload/addfile',
          formdata
        )
        .subscribe({
          next: (data) => {
            console.log('Sucessss===>', data);
          },
          error: (error) => {
            this.errData = error;
            console.log('errData', this.errData.error.text);
            var Str = this.errData.error.text;

            var newStr = Str.replace('userkey:', '');

            console.log('newstr', newStr);
            this.co_secondaryDocKey = newStr;
          },
        });
    }
  }
  submitAddressProof(event: any) {
    this.file = event.target.files[0];
    console.log('file', this.file);
    if (this.addProof) {
      var filedata = {
        description: this.addProof,
      };
      var formdata = new FormData();
      formdata.append('file', this.file);
      formdata.append(
        'filedata',
        new Blob([JSON.stringify(filedata)], { type: 'application/json' })
      );

      this.http
        .post(
          'https://qvulllj0r2.execute-api.us-east-1.amazonaws.com/dhs/upload/addfile',
          formdata
        )
        .subscribe({
          next: (data) => {
            console.log('Sucessss===>', data);
          },
          error: (error) => {
            this.errData = error;
            console.log('errData', this.errData.error.text);
            var Str = this.errData.error.text;

            var newStr = Str.replace('userkey:', '');

            console.log('newstr', newStr);
            this.addProofKey = newStr;
          },
        });
    }
  }
  submitDependentChild(event: any) {
    this.file = event.target.files[0];
    console.log('file', this.file);
    var filedata = {
      description: this.dependantchildproof,
    };
    var formdata = new FormData();
    formdata.append('file', this.file);
    formdata.append(
      'filedata',
      new Blob([JSON.stringify(filedata)], { type: 'application/json' })
    );

    this.http
      .post(
        'https://qvulllj0r2.execute-api.us-east-1.amazonaws.com/dhs/upload/addfile',
        formdata
      )
      .subscribe({
        next: (data) => {
          console.log('Sucessss===>', data);
        },
        error: (error) => {
          this.errData = error;
          console.log('errData', this.errData.error.text);
          var Str = this.errData.error.text;

          var newStr = Str.replace('userkey:', '');

          console.log('newstr', newStr);
          this.dependantChildKey = newStr;
        },
      });
  }
  submitDependentAdult(event: any) {
    this.file = event.target.files[0];
    console.log('file', this.file);
    var filedata = {
      description: this.dependantadultproof,
    };
    var formdata = new FormData();
    formdata.append('file', this.file);
    formdata.append(
      'filedata',
      new Blob([JSON.stringify(filedata)], { type: 'application/json' })
    );

    this.http
      .post(
        'https://qvulllj0r2.execute-api.us-east-1.amazonaws.com/dhs/upload/addfile',
        formdata
      )
      .subscribe({
        next: (data) => {
          console.log('Sucessss===>', data);
        },
        error: (error) => {
          this.errData = error;
          console.log('errData', this.errData.error.text);
          var Str = this.errData.error.text;

          var newStr = Str.replace('userkey:', '');

          console.log('newstr', newStr);
          this.dependantAdultKey = newStr;
        },
      });
  }

  submitDependentAdultAge(event: any) {
    this.file = event.target.files[0];
    console.log('file', this.file);
    var filedata = {
      description: this.dependantadultAgeproof,
    };
    var formdata = new FormData();
    formdata.append('file', this.file);
    formdata.append(
      'filedata',
      new Blob([JSON.stringify(filedata)], { type: 'application/json' })
    );

    this.http
      .post(
        'https://qvulllj0r2.execute-api.us-east-1.amazonaws.com/dhs/upload/addfile',
        formdata
      )
      .subscribe({
        next: (data) => {
          console.log('Sucessss===>', data);
        },
        error: (error) => {
          this.errData = error;
          console.log('errData', this.errData.error.text);
          var Str = this.errData.error.text;

          var newStr = Str.replace('userkey:', '');

          console.log('newstr', newStr);
          this.dependantAdultAgeProofKey = newStr;
        },
      });
  }

  get co_lastname() {
    return this.registerForm.get('co_lastname')!;
  }
  get co_firstname() {
    return this.registerForm.get('co_firstname')!;
  }
  get co_ssn() {
    return this.registerForm.get('co_ssn')!;
  }
  get co_dob() {
    return this.registerForm.get('co_dob')!;
  }
  get co_race() {
    return this.registerForm.get('co_race')!;
  }
  get co_ethnicity() {
    return this.registerForm.get('co_ethnicity')!;
  }
  get co_gender() {
    return this.registerForm.get('co_gender')!;
  }
  get co_relationship_to_the_child() {
    return this.registerForm.get('co_relationship_to_the_child')!;
  }
  get lastname() {
    return this.registerForm.get('lastname')!;
  }
  get firstname() {
    return this.registerForm.get('firstname')!;
  }
  get ssn() {
    return this.registerForm.get('ssn')!;
  }
  get dob() {
    return this.registerForm.get('dob')!;
  }
  get race() {
    return this.registerForm.get('race')!;
  }
  get ethnicity() {
    return this.registerForm.get('ethnicity')!;
  }
  get gender() {
    return this.registerForm.get('gender')!;
  }
  get relationship_to_the_child() {
    return this.registerForm.get('relationship_to_the_child')!;
  }

  get line1() {
    return this.registerForm.get('line1')!;
  }
  get line2() {
    return this.registerForm.get('line2')!;
  }
  get city() {
    return this.registerForm.get('city')!;
  }
  get state() {
    return this.registerForm.get('state')!;
  }
  get zip() {
    return this.registerForm.get('zip')!;
  }
  get school_district() {
    return this.registerForm.get('school_district')!;
  }

  get m_line1() {
    return this.registerForm.get('m_line1')!;
  }
  get m_line2() {
    return this.registerForm.get('m_line2')!;
  }
  get m_city() {
    return this.registerForm.get('m_city')!;
  }
  get m_state() {
    return this.registerForm.get('m_state')!;
  }
  get m_zip() {
    return this.registerForm.get('m_zip')!;
  }
  get m_school_district() {
    return this.registerForm.get('m_school_district')!;
  }
  get number_of_adults() {
    return this.registerForm.get('number_of_adults')!;
  }

  get number_of_childran() {
    return this.registerForm.get('number_of_childran')!;
  }
  get family_size() {
    return this.registerForm.get('family_size')!;
  }
  get primary_language() {
    return this.registerForm.get('primary_language')!;
  }
  numberOnly(event: { which: any; keyCode: any }): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  toggleButton() {
    this.case2 = !this.case2;
  }

  toggleHomless() {
    this.isHomless = !this.isHomless;
  }

  toggleButtonAddress(e: any) {
    this.caseAddress = !this.caseAddress;
    if (e.target.checked == true) {
      this.isChecked = true;
    } else {
      this.isChecked = false;
    }
  }

  calculateResultForm() {
    const number_of_adults = +this.registerForm.get('number_of_adults')?.value;
    const number_of_childran =
      +this.registerForm.get('number_of_childran')?.value;
    const family_size = +this.registerForm.get('family_size')?.value;
    this.registerForm
      .get('total_family_size')
      ?.setValue(number_of_adults + number_of_childran + family_size);
  }

  post() {
    let sendobj = {
      type_referal: this.registerForm.value.type_referal,
      dates: this.registerForm.value.dates,
      parentapplication: {
        parentproofofidentity: [
          {
            doecument_type: this.registerForm.value.primaryDoc,
            userkey: this.primaryDocKey,
          },
          {
            doecument_type: this.registerForm.value.secondaryDoc,
            userkey: this.secondaryDocKey,
          }
        ],
        lastname: this.registerForm.value.lastname,
        firstname: this.registerForm.value.firstname,
        mi: this.registerForm.value.mi,
        ssn: this.registerForm.value.ssn,
        dob: this.registerForm.value.dob,
        race: this.registerForm.value.race,
        ethnicity: this.registerForm.value.ethnicity,
        gender: this.registerForm.value.gender,
        relationship_to_the_child:
          this.registerForm.value.relationship_to_the_child,
      },
      co_applicant: {
        coapplicantproofofidentity: [
          {
            doecument_type: this.registerForm.value.co_primaryDoc,
            userkey: this.co_primaryDocKey,
          },
          {
            doecument_type: this.registerForm.value.co_secondaryDoc,
            userkey: this.co_secondaryDocKey,
          },
        ],
        lastname: this.registerForm.value.co_lastname,
        firstname: this.registerForm.value.co_firstname,
        mi: this.registerForm.value.co_mi,
        ssn: this.registerForm.value.co_ssn,
        dob: this.registerForm.value.co_dob,
        race: this.registerForm.value.co_race,
        ethnicity: this.registerForm.value.co_ethnicity,
        gender: this.registerForm.value.co_gender,
        relationship_to_the_child:
          this.registerForm.value.co_relationship_to_the_child,
      },
      address: [
        {
          type: this.registerForm.value.type,
          line1: this.registerForm.value.line1,
          line2: this.registerForm.value.line2,
          city: this.registerForm.value.city,
          state: this.registerForm.value.state,
          zip: this.registerForm.value.zip,
          school_district: this.registerForm.value.school_district,
          home_phone: this.registerForm.value.home_phone,
          cell_phone: this.registerForm.value.cell_phone,
          email: this.registerForm.value.email,
          proof_of_address: this.addProofKey,
        },
        {
          type: this.registerForm.value.m_type,
          line1: this.registerForm.value.m_line1,
          line2: this.registerForm.value.m_line2,
          city: this.registerForm.value.m_city,
          state: this.registerForm.value.m_state,
          zip: this.registerForm.value.m_zip,
          school_district: this.registerForm.value.m_school_district,
          home_phone: this.registerForm.value.m_home_phone,
          cell_phone: this.registerForm.value.m_cell_phone,
          email: this.registerForm.value.m_email,
        },
      ],
      other_info: {
        dependantadultproof: [
          {
            userkey: this.dependantAdultKey,
          },
          {
            userkey: this.dependantAdultAgeProofKey,
          },
        ],
        dependantchildproof: [
          {
            userkey: this.dependantChildKey,
          },
        ],
        military_status: this.registerForm.value.military_status,
        primary_language: this.registerForm.value.primary_language,
        dependant_adults: this.registerForm.value.number_of_adults,
        dependant_children: this.registerForm.value.number_of_childran,
        number_of_applicantandcoapplicant: this.registerForm.value.family_size,
        total_family_size: this.registerForm.value.total_family_size,
      },
    };
    console.log(sendobj);

    this.demoService.postDemographic(sendobj).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error) => {
        this.errData = error;
        console.log('errData', this.errData.error.text);
        var Str = this.errData.error.text;
        var newStr = Str.replace('ID:', '');
        console.log('newstr', newStr);
        this.masterKey = newStr;
        this.dataKey.emit(this.masterKey);
      },
    });
  }

  getDemographicData() {
    this.demoService.getDemographic().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        alert('Error');
      },
    });
  }

  // getDemoKeyData(parentIdentityPrimaryKey:any){
  //   this.demoService.getdemoKey(parentIdentityPrimaryKey).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //     },
  //     error: (err) => {
  //       this.errFile = err;
  //       console.log('errData', this.errFile);
  //     },
  //   });
  // }

  // getDemoo(){
  //   this.demoService.getDemo().subscribe({
  //     next: (res) => {
         
  //     },
  //     error: (err) => {
  //       alert('Error');
  //     },
  //   });
  // }
  patch(masterKey: any) {
    let response: any;
    this.demoService.getDemographic(masterKey).subscribe({
      next: (res: any) => {
        console.log(res);
        response = res;
        console.log('res variablr', response);

        this.registerForm.patchValue({
          type_referal: response.type_referal,
          dates: response.dates,

          lastname: response.parentapplication.lastname,
          firstname: response.parentapplication.firstname,
          mi: response.parentapplication.mi,
          ssn: response.parentapplication.ssn,
          dob: response.parentapplication.dob,
          race: response.parentapplication.race,
          ethnicity: response.parentapplication.ethnicity,
          gender: response.parentapplication.gender,
          relationship_to_the_child:
            response.parentapplication.relationship_to_the_child,


          parentIdentityPrimaryKey: response.parentapplication.parentproofofidentity[0].userkey,

          co_lastname: response.co_applicant.lastname,
          co_firstname: response.co_applicant.firstname,
          co_mi: response.co_applicant.mi,
          co_ssn: response.co_applicant.ssn,
          co_dob: response.co_applicant.dob,
          co_race: response.co_applicant.race,
          co_ethnicity: response.co_applicant.ethnicity,
          co_gender: response.co_applicant.gender,
          co_relationship_to_the_child:
            response.co_applicant.relationship_to_the_child,

          line1: response.address[0].line1,
          line2: response.address[0].line2,
          city: response.address[0].city,
          state: response.address[0].state,
          zip: response.address[0].zip,
          school_district: response.address[0].school_district,
          home_phone: response.address[0].home_phone,
          cell_phone: response.address[0].cell_phone,
          email: response.address[0].email,

          m_line1: response.address[1].line1,
          m_line2: response.address[1].line2,
          m_city: response.address[1].city,
          m_state: response.address[1].state,
          m_zip: response.address[1].zip,
          m_school_district: response.address[1].school_district,
          m_home_phone: response.address[1].home_phone,
          m_cell_phone: response.address[1].cell_phone,
          m_email: response.address[1].email,

          military_status: response.other_info.military_status,
          primary_language: response.other_info.primary_language,
          number_of_childran: response.other_info.dependant_children,
          number_of_adults: response.other_info.dependant_adults,
          family_size: response.other_info.number_of_applicantandcoapplicant,
          total_family_size: response.other_info.total_family_size,
        });

        this.parentIdentityPrimaryKey = response.parentapplication.parentproofofidentity[0].userkey;
        this.demoService.getparentIdentityPrimaryKey(this.parentIdentityPrimaryKey).subscribe({
          next: (res: any) => {
            this.dataPrimaryDoc = res;
            console.log("get demodat",this.dataPrimaryDoc.FileName);
          },
          error: (err: any) => {
            alert('Error');
          },
        });

        this.parentIdentitySecondaryKey = response.parentapplication.parentproofofidentity[1].userkey;
        this.demoService.getparentIdentitySecondaryKey(this.parentIdentitySecondaryKey).subscribe({
          next: (res: any) => {
            this.dataSecondaryDoc = res;
            console.log("get demodat",this.dataSecondaryDoc.FileName);
          },
          error: (err: any) => {
            alert('Error');
          },
        });

        this.parentIdentityCoPrimaryKey = response.co_applicant.coapplicantproofofidentity[0].userkey;
        this.demoService.getCoParentIdentityPrimaryKey(this.parentIdentityCoPrimaryKey).subscribe({
          next: (res: any) => {
            this.dataCoPrimaryDoc = res;
            console.log("get demodat",this.dataCoPrimaryDoc.FileName);
          },
          error: (err: any) => {
            alert('Error');
          },
        });


        this.parentIdentityCoSecondaryKey = response.co_applicant.coapplicantproofofidentity[1].userkey;
        this.demoService.getCoParentIdentitySecondaryKey(this.coParentIdentityCoPrimaryKey).subscribe({
          next: (res: any) => {
            this.dataCoSecondaryDoc = res;
            console.log("get demodat",this.dataCoSecondaryDoc.FileName);
          },
          error: (err: any) => {
            alert('Error');
          },
        });























      },
      error: (err: any) => {
        alert('Error');
      },
    });


  }
}
