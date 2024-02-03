package com.simi.socialmedia.controller;

import com.simi.socialmedia.model.Comment;
import com.simi.socialmedia.model.Post;
import com.simi.socialmedia.model.User;
import com.simi.socialmedia.repository.CommentRepository;
import com.simi.socialmedia.repository.PostRepository;
import com.simi.socialmedia.service.CommentService;
import com.simi.socialmedia.service.PostService;
import com.simi.socialmedia.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
public class CommentController {
    @Autowired
    private CommentService commentService;

    @Autowired
    private UserService userService;

    @Autowired
    private PostService postService;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    @PostMapping("/api/posts/{postId}/comments")
    public Comment createComment(@RequestBody Comment comment,
                                 @PathVariable Integer postId,
                                 @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwt(jwt);
        Comment createdComment = commentService.createComment(comment, postId, user.getId());
        return createdComment;

    }

    @PutMapping("/api/comments/{commentId}/like")
    public Comment likeComment(@PathVariable Integer commentId,
                               @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwt(jwt);
        Comment likedComment = commentService.likeComment(commentId, user.getId());
        return likedComment;
    }
}
