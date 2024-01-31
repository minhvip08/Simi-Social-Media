package com.simi.socialmedia.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
    private Integer userId;
    private String video;
    private LocalDateTime createdAt;

    private List<User> liked = new ArrayList<>();

    public Post(String title, String content, String image, Integer userId, String video, LocalDateTime createdAt) {
        this.title = title;
        this.content = content;
        this.image = image;
        this.userId = userId;
        this.video = video;
        this.createdAt = createdAt;
    }
}
