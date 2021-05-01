package com.RestApi.RestApi;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Setter
@NoArgsConstructor
@Entity
@AllArgsConstructor
@Builder
public class TodoListModel {
    @Id
    String id;

    String todo;
}
