import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogDataComponent } from '../dialog-data/dialog-data.component';

@Component({
  selector: 'app-renewal-policy',
  templateUrl: './renewal-policy.component.html',
  styleUrls: ['./renewal-policy.component.css']
})
export class RenewalPolicyComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, private dialog: MatDialog, private matConfig: MatDialogConfig) { }

  ngOnInit(): void {
  }

  premiumCheckBoxList = this.formBuilder.group({
    Premium1: false,
    Premium2: false,
    Premium3: false,
    Premium4: false,
    Premium5: false,
    Premium6: false
  });

  category:string= "";
  insuranceType:string | undefined;

  renewalPolicyForm = new FormGroup({
    category: new FormControl("",Validators.required),
    insuranceType: new FormControl("",Validators.required)
  })

  getCategory(){
    return this.renewalPolicyForm.get('category')?.value!
  }

  getInsuranceType(){
    return this.renewalPolicyForm.get('insuranceType')?.value!
  }

  onSubmit(){
    console.log(this.insuranceType)
    return this.insuranceType
  }

  openDialog(){
    this.matConfig= new MatDialogConfig();
    this.matConfig.disableClose=true;
    this.dialog.open(DialogDataComponent);
  }
  
}