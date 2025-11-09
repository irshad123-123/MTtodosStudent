import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ItodoArr } from '../models/todos';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  todoArr : Array<ItodoArr>= [
    {
      todoItem : 'HTML',
      todoId : '123'
    },
    {
      todoItem : 'CSS',
      todoId : '124'
    },
    {
      todoItem : 'Javascript',
      todoId : '125'
    }
  ]
  isEditMode :boolean = false
  constructor( private _matSnackBar : MatSnackBar) { }

  ngOnInit(): void {
  }
  @ViewChild('onTodo') todoRef! : ElementRef

  Uuid = () => {
    return (
      String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
      const random = (Math.random() * 16) | 0;
      const value = character === "x" ? random : (random & 0x3) | 0x8;
      return value.toString(16);
    });
  };

  onAddTodo(): void{
    if(this.todoRef.nativeElement.value.length > 0){
      let todoObj ={
      todoItem : this.todoRef.nativeElement.value,
      todoId : this.Uuid()
    }
    console.log(todoObj)
    this.todoRef.nativeElement.value=''
    this.todoArr.unshift(todoObj)
    this._matSnackBar.open(`The ${todoObj.todoItem} is added successfully`, 'close',{
      duration:2000,
      verticalPosition:'top',
      horizontalPosition:'left'
    })
    }
  }

  onEditTodo(todo:ItodoArr): void{
    let Edit_Id = todo.todoId
    localStorage.setItem('Edit_Id', Edit_Id)
    console.log(Edit_Id)
    this.todoRef.nativeElement.value = todo.todoItem
    this.isEditMode = true
  }

  onUpdateTodo(): void{
    let Update_Id = localStorage.getItem('Edit_Id')
    localStorage.removeItem('Edit_Id')
    if(Update_Id){
      let Updated_Obj = {
      todoItem : this.todoRef.nativeElement.value,
      todoId : Update_Id
    }
    let getIndex = this.todoArr.findIndex(todo => todo.todoId === Update_Id)
    this.todoArr[getIndex] = Updated_Obj
    }
    this.isEditMode = false
    this.todoRef.nativeElement.value = ''
    this._matSnackBar.open(`The ${Update_Id} is updated successfully !!!`,'close',{
      duration:2000,
      verticalPosition:'top',
      horizontalPosition:'left'
    })
  }

  onRemoveTodo(Remove:ItodoArr): void{
    let isConfirm = confirm('Are you sure want to remove this todo !!!')
    if(isConfirm){
      let getIndex = this.todoArr.findIndex(todo=>todo.todoId===Remove.todoId)
    this.todoArr.splice(getIndex, 1)
    this._matSnackBar.open(`The todo is removed successfully !!!`, 'close',{
      duration:2000,
      verticalPosition:'top',
      horizontalPosition:'left'
    })
    }

  }

}
