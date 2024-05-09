import { Injectable } from '@angular/core';
import { Customer } from './form/form.medel';
import { Observable, of } from 'rxjs';
import { ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  forms : Customer[] = []
  constructor() {
  const storedForm = localStorage.getItem('customers')
  if(storedForm){
    this.forms = JSON.parse(storedForm)
  }
  }

  addUser(user : Customer){
  this.forms.push(user)
  localStorage.setItem('customers',JSON.stringify(this.forms))
  }

  emailExist(email : string) : boolean{
    for(let i = 0 ; i < this.forms.length ; i++){
      if(email == this.forms[i].email) return false
    }
    return true
  }

  phonExiste(phone : string) : boolean {
    for(let i = 0 ; i < this.forms.length ; i++){
      if(phone == this.forms[i].telephone) return false
    }
    return true
  }


}
