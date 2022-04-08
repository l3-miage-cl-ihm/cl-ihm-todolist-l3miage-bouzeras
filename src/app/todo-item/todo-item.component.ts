import { TodoItem } from './../todolist.service';
import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-todo-item[data]',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent implements OnInit {

  @Input() data!: TodoItem;
  @Output() update = new EventEmitter<Partial<TodoItem>>();
  @Output() remove = new EventEmitter<TodoItem>()


@ViewChild("newTextInput") newTextInput!: ElementRef<HTMLInputElement>;

private  _editing = false;
get editing() :boolean {return this._editing};
set editing(e:boolean){
  this._editing=e;
  if(this._editing){
    requestAnimationFrame(
      ()=> this.newTextInput.nativeElement?.focus()
    );
  }
}
  constructor() { }



  ngOnInit(): void {
  }

}
