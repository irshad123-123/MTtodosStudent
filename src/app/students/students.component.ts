import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Istudents } from '../models/students';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  @ViewChild('fname') fnameRef ! : ElementRef
  @ViewChild('lname') lnameRef ! : ElementRef
  @ViewChild('email') emailRef ! : ElementRef
  @ViewChild('contact') contactRef ! : ElementRef

  isEditMode :boolean = false
  stdArr : Array<Istudents> = [
    {
      fname:'Jhon',
      lname : 'Doe',
      email : 'jhon@gmail.com',
      contact : 1234567890,
      stdId : '123'
    },
    {
      fname:'May',
      lname : 'Doe',
      email : 'may@gmail.com',
      contact : 1234567890,
      stdId : '124'
    },
    {
      fname:'July',
      lname : 'Doe',
      email : 'july@gmail.com',
      contact : 1234567890,
      stdId : '125'
    }
  ]
  constructor( private _matSnackBar : MatSnackBar) { }

  ngOnInit(): void {
  }
  Uuid = () => {
    return (
      String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
      const random = (Math.random() * 16) | 0;
      const value = character === "x" ? random : (random & 0x3) | 0x8;
      return value.toString(16);
    });
  };
  onAddStd(): void{
    let stdObj = {
      fname : this.fnameRef.nativeElement.value,
      lname : this.lnameRef.nativeElement.value,
      email : this.emailRef.nativeElement.value,
      contact : this.contactRef.nativeElement.value,
      stdId : this.Uuid()
    }
    console.log(stdObj)
    this.stdArr.push(stdObj)
    this.fnameRef.nativeElement.value = ''
    this.lnameRef.nativeElement.value = ''
    this.emailRef.nativeElement.value = ''
    this.contactRef.nativeElement.value = ''
    this._matSnackBar.open(`The student with name ${stdObj.fname} ${stdObj.lname} is added successfully !!!`, 'close',{
      duration : 2000,
      verticalPosition : 'top',
      horizontalPosition : 'left'
    })
  }
  onEditStd(std:Istudents): void{
    let Edit_Id = std.stdId;
    // console.log(Edit_Id)
    localStorage.setItem('Edit_Id', Edit_Id)
    this.fnameRef.nativeElement.value = std.fname
    this.lnameRef.nativeElement.value = std.lname
    this.emailRef.nativeElement.value = std.email
    this.contactRef.nativeElement.value = std.contact

    this.isEditMode = true
  }

  onUpdateStd(): void{
    let Update_Id = localStorage.getItem('Edit_Id')
    localStorage.removeItem('Edit_Id')
    if(Update_Id){
      let Updated_Obj = {
      fname : this.fnameRef.nativeElement.value,
      lname : this.lnameRef.nativeElement.value,
      email : this.emailRef.nativeElement.value,
      contact : this.contactRef.nativeElement.value,
      stdId : Update_Id
    }
    let getIndex = this.stdArr.findIndex(std => std.stdId === Update_Id)
    this.stdArr[getIndex] = Updated_Obj
    }
    this.fnameRef.nativeElement.value = ''
    this.lnameRef.nativeElement.value = ''
    this.emailRef.nativeElement.value = ''
    this.contactRef.nativeElement.value = ''

    this.isEditMode= false

    this._matSnackBar.open(`The student with id ${Update_Id} is updated successfully !!!`,'close', {
      duration : 2000,
      verticalPosition : 'top',
      horizontalPosition : 'left'
    })
    }

    onRemoveStd(std:Istudents): void{
      let isConfirm = confirm('Are you sure want to remove this students details !!!')
      if(isConfirm){
        let Removed_Id = std.stdId
      let getIndex = this.stdArr.findIndex(std => std.stdId === Removed_Id)
      this.stdArr.splice(getIndex, 1)
      this._matSnackBar.open(`The student details removed successfully !!!`, 'close',{
        duration : 2000,
        verticalPosition : 'top',
      horizontalPosition : 'left'
      })
      }
    }

}
