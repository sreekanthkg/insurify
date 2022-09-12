import { AnimationStyleMetadata } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Insurance } from '../insurance';
import { MatDialog } from '@angular/material/dialog';
import { Dialog } from '@angular/cdk/dialog';
import { PreviewMarkupComponent } from '../preview-markup/preview-markup.component';
// import { FlexAlignDirective } from '@angular/flex-layout';

export interface bike {
  value: string;
  viewValue: string;
}

export interface bikeCompany {
  name: string;
  bikeList: bike[];
}

export interface car {
  value: string;
  viewValue: string;
}

export interface carCompany {
  name: string;
  carList: bike[];
}
export interface Fruit {
  insuredSum: number;
}
export interface Duration {
  years: number;
}
export class details{
  constructor( 
    public briefs:string,
    public descriptions:string){}
}
export class premiumdetails{
  constructor( 
    public addOnName       :string,
    public addOnDescription:string,
    public addOnPremiums   :number){}
}
@Component({
  selector: 'app-add-insurance-policy',
  templateUrl: './add-insurance-policy.component.html',
  styleUrls: ['./add-insurance-policy.component.css']
})
export class AddInsurancePolicyComponent implements OnInit {
  bikeGroups: bikeCompany[] = [
    {
      name: 'Honda',
      bikeList: [
        {value: 'Honda SP 125-0', viewValue: 'Honda SP 125'},
        {value: 'Honda Shine-1', viewValue: 'Honda Shine'},
        {value: 'Honda H`ness CB350-2', viewValue: 'Honda H`ness CB350'},
      ],
    },
    {
      name: 'TVS',
      bikeList: [
        {value: 'TVS Apache RTR 160-3', viewValue: 'TVS Apache RTR 160'},
        {value: 'TVS Ronin-4', viewValue: 'TVS Ronin'},
        {value: 'TVS Apache RTR 200 4V-5', viewValue: 'TVS Apache RTR 200 4V'},
      ],
    },
    {
      name: 'Hero',
      bikeList: [
        {value: 'Hero Splendor Plus-6', viewValue: 'Hero Splendor Plus'},
        {value: 'Hero HF Deluxe-7', viewValue: 'Hero HF Deluxe'},
        {value: 'Heroflareon-8', viewValue: 'Hero Flareon'},
      ],
    },
    {
      name: 'KTM',
      bikeList: [
        {value: 'KTM 390 Duke', viewValue: 'KTM 390 Duke'},
        {value: 'KTM 125 Duke-10', viewValue: 'KTM 125 Duke'},
      ],
    },
  ];

  carGroups: carCompany[] = [
    {
      name: 'Hyundai',
      carList: [
        {value: 'Hyundai Creta-0', viewValue: 'Hyundai Creta'},
        {value: 'Hyundai Venue-1', viewValue: 'Hyundai Venue'},
        {value: 'Hyundai i20-2', viewValue: 'Hyundai i20'},
      ],
    },
    {
      name: 'Toyota',
      carList: [
        {value: 'Toyota Fortuner-3', viewValue: 'Toyota Fortuner'},
        {value: 'Toyota Innova Crysta-4', viewValue: 'Toyota Innova Crysta'},
        {value: 'Toyota Urban Cruiser-5', viewValue: 'Toyota Urban Cruiser'},
      ],
    },
    {
      name: 'Tata',
      carList: [
        {value: 'Tata Tiago-6', viewValue: 'Tata Tiago'},
        {value: 'Tata Harrier-7', viewValue: 'Tata Harrier'},
        {value: 'Tata Safari-8', viewValue: 'Tata Safari'},
      ],
    },
    {
      name: 'Maruti',
      carList: [
        {value: 'Maruti Brezza-9', viewValue: 'Maruti Brezza'},
        {value: 'Maruti Swift-10', viewValue: 'Maruti Swift'},
      ],
    },
  ];
  num:number=0;
  policyarray:details[]=[]
  premiumarray:premiumdetails[]=[]
  briefInput:string='';
  descriptionInput:string='';
  valueVariable: string='';
  xyz:details={
    briefs:'',
    descriptions :''
  }
 flags:boolean[]=[true];
 flag:boolean[]=[true]
 
 

  constructor(public http:HttpClient,public dialog:MatDialog) { }

  openDialog(){
    this.dialog.open(PreviewMarkupComponent,{data:this.valueVariable})
  }
  
  insuranceForms = new FormGroup({
    insuranceType    : new FormControl("", [Validators.required]),
    policyId         : new FormControl("", [Validators.required]),
    policyName       : new FormControl("", [Validators.required]),
    policyDescription: new FormControl("", [Validators.required]),
    category         : new FormControl("",[Validators.required]),
    policyDetails    : new FormArray([new FormGroup({
      premiums :    new FormControl("", [Validators.required,Validators.min(0)]),
      durations:    new FormControl("", [Validators.required,Validators.min(0)]),
      sumInsure:    new FormControl("", [Validators.required,Validators.min(0)]),
      adults   :    new FormControl("", [Validators.min(0)]),
      minAge   :    new FormControl("", [Validators.min(20),Validators.max(75)]),  
      maxAge   :    new FormControl("", [Validators.min(20),Validators.max(75)]),  
      kids     :    new FormControl("", [Validators.min(0)]),
      minSalary:    new FormControl("", [Validators.required,Validators.min(0)]),
      maxSalary:    new FormControl("", [Validators.required,Validators.min(0)]),
      modelsAllowed:new FormControl("", [Validators.required,Validators.min(0)]),
    })]),
    policyBenefits: new FormArray([
      new FormGroup({
        brief      : new FormControl("", [Validators.required]),
        description: new FormControl("", [Validators.required])
      })]),
    addOnDetails: new FormArray([
      new FormGroup({
        addOnName        : new FormControl("", [Validators.required]),
        addOnDescription : new FormControl("", [Validators.required]),
        addOnPremiums    : new FormControl("", [Validators.required])
      })
    ]),   
    policyDocuments: new FormControl("", [Validators.required]),
    fileSource     : new FormControl("", [Validators.required])
  });
  
  get insuranceFormControl() {
    return <FormArray>this.insuranceForms.controls['policyBenefits'];
  }
 
 
 
  ngOnInit(): void {
  this.insuranceForms.get('policyId')?.setValue(this.id.toString())
  this.insuranceForms.get('policyId')!.disable()
  }
  

  id=Math.floor(Math.random()*1000000+100000); 
  
  obj:Insurance={
    insuranceType:'',
    policyId         :'',
    policyName       :'',
    category         :'',
    policyDescription:'',
    policyDetails    :[],
    policyBenefits   :[],
    addOnDetails     :[],
    policyDocuments  :'',
    fileSource       :'',
  } ;
  
  

  public onFileChanged(event:any) {
    //Select File
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.insuranceForms.patchValue({
        fileSource: file
      });
    }
  }


  onSubmit(){
    console.log(this.policyarray) ;
    // console.log(this.insuranceForms.value);
    this.insuranceForms.get('policyId')!.enable();
    this.obj.insuranceType=this.insuranceForms.controls['insuranceType'].value!;
    this.obj.policyId=this.insuranceForms.controls['policyId'].value!;
    this.obj.policyName=this.insuranceForms.controls['policyName'].value!;
    this.obj.policyDescription=this.insuranceForms.controls['policyDescription'].value!;
    this.obj.policyDetails=this.insuranceForms.controls['policyDetails'].value;
    this.obj.policyBenefits=this.insuranceForms.controls['policyBenefits'].value;
    this.obj.addOnDetails=this.insuranceForms.controls['addOnDetails'].value;
    this.obj.fileSource=this.insuranceForms.controls['fileSource'].value;

    const formData=new FormData;
    formData.append("insuranceType",this.obj.insuranceType);
    formData.append("policyId",this.obj.policyId);
    formData.append("policyName",this.obj.policyName);
    formData.append("policyDescription",this.obj.policyDescription);
    for(let x of this.obj.policyDetails)
    {
      formData.append("policyDetails",x as Blob);
    }
    for(let x of this.obj.policyBenefits)
    {
      formData.append("policyBenefits",x as Blob);
    }
    for(let x of this.obj.addOnDetails)
    {
      formData.append("addOnDetails",x as Blob);
    }
    formData.append("fileSource",this.obj.fileSource);
    
    // this.http.post("http://localhost:9000/apis/insurances",formData, { observe: 'response' }).subscribe((data:any)=>{console.log(data)}); 
    // console.log(this.insuranceForms.value)
    this.insuranceForms.get('policyId')!.disable()
  }


  addDetails(i:any) {
    const control = <FormArray>this.insuranceForms.controls['policyDetails'];
    if((!control.at(i).value.sumInsure||!control.at(i).value.durations)&&
    ((!control.at(i).value.modelsAllowed||!control.at(i).value.premiums)||(!control.at(i).value.premiums||!control.at(i).value.minSalary||!control.at(i).value.maxSalary)
    ||(!control.at(i).value.adults||!control.at(i).value.minAge||!control.at(i).value.maxAge)
    ||(!control.at(i).value.kids||control.at(i).value.minAge||control.at(i).value.maxAge||control.at(i).value.adults)))
    {
      return
    }
    control.push(control.controls[i]);
  }
  addDetailsE(i:any) {
    const control = <FormArray>this.insuranceForms.controls['policyDetails'];
    if((!control.at(i).value.sumInsure||!control.at(i).value.durations)&&
    ((!control.at(i).value.modelsAllowed||!control.at(i).value.premiums)||(!control.at(i).value.premiums||!control.at(i).value.minSalary||!control.at(i).value.maxSalary)
    ||(!control.at(i).value.adults||!control.at(i).value.minAge||!control.at(i).value.maxAge)
    ||(!control.at(i).value.kids||control.at(i).value.minAge||control.at(i).value.maxAge||control.at(i).value.adults)))
    {
      return
    }
    control.push(new FormGroup({
      premiums: new FormControl("", [Validators.required]),
      durations: new FormControl("", [Validators.required]),
      sumInsure: new FormControl("", [Validators.required]),
      adults   :new FormControl(""),
      kids     :new FormControl(""),
      minSalary:new FormControl(""),
      maxSalary:new FormControl("")
    }
    ));
  }
  removeDetails(index: any) {
    const control = <FormArray>this.insuranceForms.controls['policyDetails'];
    control.removeAt(index);
  }
  addDetails1(index: any) {
    const control = <FormArray>this.insuranceForms.controls['policyBenefits'];
    
    if(!control.at(index).value.brief||!control.at(index).value.description)
    {
      return
    }

    this.flags[index]=false
    this.flags.push(true)
    control.push(new FormGroup({
      brief: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required])
    }
    ));
    const arr=new details('','');
      // console.log(control.controls[index].value.brief)
      arr.briefs=control.controls[index].value.brief;
      // console.log(this.xyz.briefs)
      arr.descriptions=control.controls[index].value.description;
      this.policyarray.push(arr);
      console.log(this.policyarray) 
  }
  removeDetails1(index: any) {
    const control = <FormArray>this.insuranceForms.controls['policyBenefits'];
    control.removeAt(index);
    this.policyarray.splice(index, 1);
    this.flags.splice(index,1)
    console.log(this.policyarray) 
    console.log(this.flags) 
    console.log(this,this.insuranceForms.value);
    
  }
  addDetails2(index:any) {
    const control = <FormArray>this.insuranceForms.controls['addOnDetails'];
    this.flag[index]=false
    this.flag.push(true)
    control.push(new FormGroup({
      addOnName: new FormControl("", [Validators.required]),
      addOnDescription: new FormControl("", [Validators.required]),
      addOnPremiums: new FormControl("", [Validators.required])
    }));
    const arr1=new premiumdetails('','',0);
      
      arr1.addOnName       =control.controls[index].value.addOnName;
      arr1.addOnDescription=control.controls[index].value.addOnDescription;
      arr1.addOnPremiums   =control.controls[index].value.addOnPremiums;
      this.premiumarray.push(arr1);
      console.log(this.premiumarray) 
  }
  removeDetails2(index: any) {
    const control = <FormArray>this.insuranceForms.controls['addOnDetails'];
    control.removeAt(index);
    this.premiumarray.splice(index, 1);
    this.flag.splice(index,1)
    console.log(this.premiumarray) 
    console.log(this.flag) 
    console.log(this,this.insuranceForms.value);
  }
  
 
  

  
  get insurancex(){
    return this.insuranceForms.get('insuranceType')?.value!
  }
  get categoryx(){
    return this.insuranceForms.get('category')?.value!
  }
  get policyDetailsx() {
    return (this.insuranceForms.get('policyDetails') as FormArray).controls;
  }
  get policyBenefitsx() {
    return (this.insuranceForms.get('policyBenefits') as FormArray).controls;
  }
  get policyAddOnsx(){
    return (this.insuranceForms.get('addOnDetails') as FormArray).controls;
  }
//=========================================================================================================
//Methods for chips component
addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  fruits: Fruit[] = [{insuredSum: 100000}, {insuredSum: 1000000}, {insuredSum: 5000000}];
  duration: Duration[] = [{years: 1}, {years: 5}, {years: 10}];
  add(event: MatChipInputEvent): void {
    // const value = (event.value || '').trim();
    const value = +event.value ;
    // Add our fruit
    if (value) {
      this.fruits.push({insuredSum: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }
  addduration(event: MatChipInputEvent): void {
    
    const value = +event.value ;
    
    if (value) {
      this.duration.push({years: value});
    }
    event.chipInput!.clear();
  }

  removeduration(x: Duration): void {
    const index = this.duration.indexOf(x);

    if (index >= 0) {
      this.duration.splice(index, 1);
    }
  }

}
