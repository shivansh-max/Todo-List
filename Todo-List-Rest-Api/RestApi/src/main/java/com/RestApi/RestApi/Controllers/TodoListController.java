package com.RestApi.RestApi;

import lombok.extern.slf4j.Slf4j;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
// @ResponseBody
@Transactional
@Slf4j
@RequestMapping(value = "/todo-list", method = { RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE,
        RequestMethod.PUT })
public class TodoListController {
    @Autowired
    TodoListRepo todolistrepo;

    @Autowired
    FindingThreeService findingthreeservice;

    @GetMapping("/alltodo")
    public List<TodoListModel> getAllItems() {
//        System.out.println(todolistrepo.findAll());
        return todolistrepo.findAll();
    }


    @GetMapping("/todoitem/{id}")
    public TodoListModel getCertainItem(@PathVariable(value = "id") String itemId) {
        log.info("Successfully imported the item from MYSQL server");
        return todolistrepo.findById(itemId).orElseThrow(() -> new ResourceNotFoundException("TodoListModel"));
    }

    @GetMapping("/todothreeitems/{quantity}/{amount}")
    public List<TodoListModel> getThreeItems(
            @PathVariable(value = "quantity") String itemAmount,
            @PathVariable(value = "amount") String itemQuantity) {

        return findingthreeservice.threeAtATime(Integer.parseInt(itemAmount), Integer.parseInt(itemQuantity));
    }

    @GetMapping("/count")
    public int getAllItemsCount() {

        return todolistrepo.findAll().size();
    }

    @DeleteMapping("/deletetodo/{id}")
    public ResponseEntity<?> deleteTodo(@PathVariable(value = "id") String itemId) {
        log.info("Deleted safely");
        TodoListModel item = todolistrepo.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("TodoListModel"));

        todolistrepo.delete(item);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/additem")
    public TodoListModel addItem(@RequestBody TodoListModel shoppinglistmodel) {
        log.info("Added post to MYSQL database");
        return todolistrepo.save(shoppinglistmodel);
    }


    @PutMapping("/changeitem/{id}")
    public TodoListModel updateNameItem(@PathVariable(value = "id") String bookId,
                                        @RequestBody TodoListModel shoppingList) {

        log.info("Changed Item");
        TodoListModel shoppinglist = todolistrepo.findById(bookId)
                .orElseThrow(() -> new ResourceNotFoundException("TodoListModel"));

        shoppinglist.setTodo(shoppingList.getTodo());

        TodoListModel updatedItem = todolistrepo.save(shoppinglist);
        return updatedItem;
    }
}
