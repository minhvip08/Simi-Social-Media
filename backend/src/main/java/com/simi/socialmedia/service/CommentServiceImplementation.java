package com.simi.socialmedia.service;

import com.simi.socialmedia.model.Comment;
import com.simi.socialmedia.model.Post;
import com.simi.socialmedia.model.User;
import com.simi.socialmedia.repository.CommentRepository;
import com.simi.socialmedia.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class CommentServiceImplementation implements CommentService{
    @Autowired
    UserService userService;

    @Autowired
    PostService postService;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;




    @Override
    public Comment createComment(Comment comment, Integer postId, Integer userId) throws Exception {
        User user = userService.findUserById(userId);
        Post post = postService.findPostById(postId);
        comment.setUser(user);
        comment.setContent(comment.getContent());
        comment.setCreatedAt(LocalDateTime.now());

        Comment savedComment = commentRepository.save(comment);
        post.getComments().add(savedComment);
        postRepository.save(post);
        return savedComment;

    }

    @Override
    public Comment findCommentById(Integer commentId) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        if (optionalComment.isEmpty()) {
            throw new RuntimeException("Comment not found");
        }
        return optionalComment.get();
    }

    @Override
    public Comment likeComment(Integer commentId, Integer userId) throws Exception{
        Comment comment = findCommentById(commentId);
        User user = userService.findUserById(userId);
        if (comment.getLiked().contains(user)) {
            comment.getLiked().remove(user);
        } else {
            comment.getLiked().add(user);
        }
        commentRepository.save(comment);
        return comment;
    }
}
