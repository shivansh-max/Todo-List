import { Component, OnInit } from '@angular/core';
import { RequestsService } from './requests.service';
import { TodoModel } from './todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  theBarToGetValueForTheTodo = '';

  todoList: TodoModel[] = [];

  editing: boolean = false;

  editingString: string = '';

  editingId: number = -1;

  editingPlace: number = -1;

  amount: number = 3;

  place: number = 3;

  amountInTheDataBase = 0;

  constructor(private sender: RequestsService) {}

  ngOnInit(): void {
    this.getThem();
  }

  clearTheString() {
    this.theBarToGetValueForTheTodo = '';
  }

  addTodo() {
    if (this.theBarToGetValueForTheTodo != '') {
      this.todoList.push(
        new TodoModel(
          Math.random().toString(36).substring(2, 15),
          this.theBarToGetValueForTheTodo
        )
      );

      this.sender
        .addTodo(
          new TodoModel(
            Math.random().toString(36).substring(2, 15),
            this.theBarToGetValueForTheTodo
          )
        )
        .subscribe();

      this.clearTheString();
    }
  }

  editingModeActivated(elementPlace: number, todo: string) {
    this.editing = true;

    this.editingPlace = elementPlace;

    this.editingString = todo;

    this.theBarToGetValueForTheTodo = todo;
    // this.editing = false;
  }

  saveTodo() {
    this.sender.deleteTodo(this.todoList[this.editingPlace]).subscribe();

    this.todoList[this.editingPlace] = new TodoModel(
      this.todoList[this.editingPlace].id,

      this.theBarToGetValueForTheTodo
    );
    console.log(this.todoList);

    this.sender.addTodo(this.todoList[this.editingPlace]).subscribe();

    // this.sender.saveTodo(this.todoList[this.editingPlace])

    this.editing = false;

    this.editingString = '';

    this.editingId = -1;

    this.editingPlace = -1;

    this.clearTheString();
  }

  deleteTodo() {
    this.sender.deleteTodo(this.todoList[this.editingPlace]).subscribe();

    this.todoList.splice(this.editingPlace, 1);

    console.log(this.todoList);

    this.editing = false;

    this.editingString = '';

    this.editingId = -1;

    this.editingPlace = -1;

    this.clearTheString();
  }

  onAddPage() {
    if (this.place + this.amount < this.amountInTheDataBase && !this.editing) {
      this.place += this.amount;
    }
    this.getThem();
  }

  onSubPage() {
    if (
      this.place - this.amount < this.amountInTheDataBase &&
      this.place - this.amount >= 0 &&
      !this.editing
    ) {
      this.place -= this.amount;
    }
    this.getThem();
  }

  onAddAmount() {
    this.place = 0;
    this.amount++;
    this.getThem();
  }

  onSubAmount() {
    this.place = 0;
    this.amount--;
    this.getThem();
  }

  getThem() {
    this.sender.getSomeThings(this.place, this.amount).subscribe((items) => {
      this.todoList = items;
    });

    this.sender.getCountOfThings().subscribe((amount: number) => {
      this.amountInTheDataBase = amount;
    });
  }
}
