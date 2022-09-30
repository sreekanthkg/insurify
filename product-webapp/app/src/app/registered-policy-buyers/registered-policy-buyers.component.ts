import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registered-policy-buyers',
  templateUrl: './registered-policy-buyers.component.html',
  styleUrls: ['./registered-policy-buyers.component.css']
})
export class RegisteredPolicyBuyersComponent implements OnInit {

  policyBuyerDetails:any;
  customerPolicyId:any;

  backButton:boolean=true;
  allUserDetailsView:boolean=false;
  renewView:boolean=true;
  claimView:boolean=true;


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    let response= this.http.get("http://localhost:8084/api/policies/"+localStorage.getItem('insurancePolicyId'));
    response.subscribe((data)=>{
      
      console.log(data);
      this.policyBuyerDetails=data;
      // console.log(this.registeredPolicies);
  })
  }
back(){
  this.backButton=true;
  this.renewView=true;
  this.allUserDetailsView=false;
  this.claimView=true;
}

 renew(policy:any){
  this.backButton=false;
  this.renewView=false;
  this.allUserDetailsView=true;
  this.claimView=true;

  this.customerPolicyId=policy.customerPolicyId;
 }

 claim(policy:any){
  this.backButton=false;
  this.renewView=true;
  this.allUserDetailsView=true;
  this.claimView=false;
 }


 downloadPdf(base64String:any, policyNo:any){

  const source = `data:application/pdf;base64,${base64String}`;
  const link = document.createElement("a");
  link.href = source;
  // link.download = `${fil.pdf`
  link.download=`${policyNo}-claimDocument.pdf`;
  link.click();  

}


onClickDownloadFile(doc:any, policyNo:any)
{
this.downloadPdf(doc, policyNo);
}


openFile(doc: any){
var byteCharacters = atob(doc);
var byteNumbers = new Array(byteCharacters.length);

for (var i = 0; i < byteCharacters.length; i++) {
  byteNumbers[i] = byteCharacters.charCodeAt(i);
}

var byteArray = new Uint8Array(byteNumbers);
var file = new Blob([byteArray], { type: 'application/pdf;base64' });
var fileURL = URL.createObjectURL(file);
window.open(fileURL);
}


}
