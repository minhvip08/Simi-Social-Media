package com.simi.socialmedia.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String content;

    @ManyToOne
    private User user;

    @ManyToMany
    private List<User> liked = new ArrayList<>();

    private LocalDateTime createdAt;

    public Comment(String content, User user, LocalDateTime createdAt) {
        this.content = content;
        this.user = user;
        this.createdAt = createdAt;
    }

    public Comment(String content, User user, List<User> liked, LocalDateTime createdAt) {
        this.content = content;
        this.user = user;
        this.liked = liked;
        this.createdAt = createdAt;
    }
}
