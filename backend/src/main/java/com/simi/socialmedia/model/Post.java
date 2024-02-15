package com.simi.socialmedia.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;
    private String content;
    private String image;

//    @JsonIgnore
    @ManyToOne
    private User user;
    private String video;
    private LocalDateTime createdAt;

    @ManyToMany
    private List<User> liked = new ArrayList<>();

    @OneToMany
    private List<Comment> comments = new ArrayList<>();


    public Post(String title, String content, String image, User user, String video, LocalDateTime createdAt, List<User> liked, List<Comment> comments) {
        super();
        this.title = title;
        this.content = content;
        this.image = image;
        this.user = user;
        this.video = video;
        this.createdAt = createdAt;
        this.liked = liked;
        this.comments = comments;
    }
}
