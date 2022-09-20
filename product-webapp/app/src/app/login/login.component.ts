import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { User } from '../user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  msg = '';
  user: User = new User();
  constructor(private loginservice : LoginService) { }

  ngOnInit(): void {
  }

  logInForm = new FormGroup({
    emailId: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
   });
  
   logIn(data:any){

    this.user.emailId = data.value.emailId;
    this.user.password = data.value.password;
  
    console.log(this.user);

      //  this.loginservice.loginUser(this.user).subscribe((response)=> {
      //     console.log("Log in successfull", data);}
      //     (error) => {console.error("Log in failed",data);});


          
    if(this.logInForm.valid){
        this.loginservice.loginUser(this.user).subscribe((response) => {
          console.log("Log in successfull",data );
        }, error => {
          console.log("Log in failed", data);
          this.msg = "Please enter valid credentials";
        }
      )
      }
      
    }



  get emailId(): FormControl{
    return this.logInForm.get('emailId') as FormControl;
  }

  get password(): FormControl{
    return this.logInForm.get('password') as FormControl;
  }
  

}
