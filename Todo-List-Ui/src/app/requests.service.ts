import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';
import { map } from 'rxjs/operators';
import { TodoModel } from './todo.model';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  restApi = environment;

  constructor(private sender: HttpClient) {}

  getSomeThings(amount: number, set: number) {
    return this.sender
      .get<TodoModel[]>(
        this.restApi.restApiUrl + 'todothreeitems/' + set + '/' + amount + '/'
      )
      .pipe(
        map((dItems) => {
          console.log(dItems);
          console.log(
            this.restApi.restApiUrl +
              'todothreeitems/' +
              set +
              '/' +
              amount +
              '/'
          );
          return dItems.map((todoitem: { id: string; todo: string }) => {
            return new TodoModel(todoitem.id, todoitem.todo);
          });
        })
      );
  }

  getCountOfThings() {
    return this.sender.get<Number>(this.restApi.restApiUrl + 'count').pipe(
      map((dItems) => {
        return Number(dItems);
      })
    );
  }

  addTodo(todo: TodoModel) {
    return this.sender.post(this.restApi.restApiUrl + 'additem', todo);
  }

  deleteTodo(todo: TodoModel) {
    return this.sender.delete(this.restApi.restApiUrl + 'deletetodo/' + todo.id);
  }

}
