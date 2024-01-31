package com.simi.socialmedia.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@lombok.AllArgsConstructor
@lombok.NoArgsConstructor
@Entity
@Table(name = "users")
public class User {
    @Id
    private Integer id;

    private String firstName;
    private String lastName;
    private String email;
    private String password;



}
