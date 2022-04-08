import { TodolistService, TodoList, TodoItem } from './todolist.service';
import { Component, OnDestroy } from '@angular/core';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
  
})
export class AppComponent implements OnDestroy {

  title = 'l3m-tpX-todolist-angular-y2022';
  //private subj = new BehaviorSubject<TodoList>({label: 'L3 MIAGE', items: [] });
   //bs = new BehaviorSubject<TodoList>({label: 'L3 MIAGE', items: [] })

  constructor(private todoListService: TodolistService){

  }



  ngOnDestroy(): void {
    this.fillLocalStorage()
  }

  get ObsTodoService(): Observable<TodoList>{
    return this.todoListService.observable;
  }


  fillLocalStorage(): void{
    this.ObsTodoService.subscribe((TDS) => {
      localStorage.setItem('TODO', JSON.stringify(TDS))
      //localStorage.getItem('TODO')
      // JSON.parse(localStorage.getItem('TODO'))
    })
  }

  submitForm(v: string): void{
    this.todoListService.create(v);
    console.log("V en param est : "+ v);

    console.log("Formulaire soumi ");
    console.log(this.todoListService);
    this.fillLocalStorage()
  }

  update(data: Partial<TodoItem>, ...items: readonly TodoItem[]): void{
    this.todoListService.update(data, ...items);
    this.fillLocalStorage();
  }

  delete(item: TodoItem): void{
    this.todoListService.delete(item);
    this.fillLocalStorage();
  }
 

  trackById(n: number, i: TodoItem): number{
    return i.id;
  }
}