import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { FormService } from '../form.service';
import { Customer } from './form.medel';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {


  constructor(private formBuilder : FormBuilder,private formService : FormService){}

  form! : FormGroup
  ngOnInit(): void {
  this.form = this.formBuilder.group({
  nom : [null,[Validators.required,Validators.minLength(5)]],
  prénom : [null, [Validators.required,Validators.minLength(5)]],
  email : ['',[Validators.required,Validators.email,this.checkEmail.bind(this)]],
  telephone : ['+212',[Validators.required,Validators.minLength(13),Validators.maxLength(13),this.phoneValidator.bind(this)]]
  })
  }

  phoneValidator(control : AbstractControl) {
  const valeur : string = control.value
  if(valeur.startsWith('+212') && this.formService.phonExiste(control.value)){
    return null
  }
  return { phoneValidator : true}
  }




  checkEmail(control : AbstractControl){
  const emailExist : boolean = this.formService.emailExist(control.value)
  if(emailExist){
    return null
  }
  return { checkEmail : true }
  }




  addUser(){
    if(this.form.valid){
    if(this.formService.emailExist(this.form.get('email')?.value)){
      const user : Customer = {
      nom : this.form.get('nom')?.value,
      prénom : this.form.get('prénom')?.value,
      email : this.form.get('email')?.value,
      telephone : this.form.get('telephone')?.value
    }
      this.formService.addUser(user)
      console.log(user);
    }else{
    console.log("email déja existe");
    }
    }
  }

}


