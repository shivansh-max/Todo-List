package com.RestApi.RestApi;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Slf4j
public class FindingThreeService {
    @Autowired
    TodoListRepo todolistrepo;

    public List<TodoListModel> threeAtATime(int quantity, int sectionOfThree) {

        List<TodoListModel> allTodos = new ArrayList<TodoListModel>();

//        System.out.println(allTodos);

        if (todolistrepo.findAll().size() - sectionOfThree < quantity) {
            quantity = todolistrepo.findAll().size() - sectionOfThree;
        }
        allTodos = todolistrepo.getPagination(quantity, sectionOfThree);
        return allTodos;
    }

}
