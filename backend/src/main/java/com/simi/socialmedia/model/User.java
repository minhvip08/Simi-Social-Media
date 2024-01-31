package com.simi.socialmedia.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

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
    private String gender;
    private List<Integer> followers = new ArrayList<>();
    private List<Integer> followings = new ArrayList<>();




}
