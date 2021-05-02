package com.RestApi.RestApi;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;
//import java.util.List;

@Repository
public interface TodoListRepo extends JpaRepository <TodoListModel, String> {
    @Query(value = "select * from todo_list_model limit :quantity offset :offset", nativeQuery = true)
    ArrayList<TodoListModel> getPagination(@Param("quantity") int q, @Param("offset") int of);
}
