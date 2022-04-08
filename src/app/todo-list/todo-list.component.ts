import { Observable, BehaviorSubject, filter, combineLatest, map } from 'rxjs';
import { TodoItem, TodoList, TodolistService } from './../todolist.service';
import { Component, OnInit, ChangeDetectionStrategy, IterableDiffers } from '@angular/core';



type fctfilter = (item:TodoItem) => boolean;

export interface TodoListPlus extends TodoList {
  remaining : number,
  filter: fctfilter,
  displayedItems : readonly TodoItem[],//
  allDone : boolean
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {

  readonly filterAll : fctfilter = () => true;
  readonly filterActives: fctfilter = (item) => !item.isDone;
  readonly filterCompleted : fctfilter = (item) => item.isDone
  f: fctfilter = this.filterAll;

  private fc = new BehaviorSubject<fctfilter>(this.filterAll);
  readonly tdlobs :Observable<TodoListPlus>;

  constructor(private tds : TodolistService) {
    this.tdlobs  = combineLatest([tds.observable,this.fc]).pipe(
      map(([L,f]) => ({
        ...L,
        remaining : L.items.reduce((nb,item) => item.isDone ? nb : nb+1,0), 
        filter : f,//
        displayedItems : L.items.filter(f),

      })),
      map( inter => ({
        ...inter,
        allDone: inter.remaining === 0// dans le cas tout est coché (remainign ===0)true
      }))
    )
  }
  ngOnInit(): void {
  }

  get ObsTdl(): Observable<TodoList>{
    return this.tds.observable;
  }

ajouter(s:string): void {
  this.tds.create(s);
}

update(up: Partial<TodoItem>, ...items: TodoItem[] ): void{
  this.tds.update(up, ...items);
}

delete(item:TodoItem):void{
  this.tds.delete(item);
}

deleteItems(items: TodoItem[]):void{
  this.tds.delete(...items);

}

updateAllDone(done:boolean, L:readonly TodoItem[]):void{
  this.update({isDone:done}, ...L);
}


setfilter(f :fctfilter){
  this.fc.next(f);
}



}




