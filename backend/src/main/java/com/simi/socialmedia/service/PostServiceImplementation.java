package com.simi.socialmedia.service;

import com.simi.socialmedia.model.Post;
import com.simi.socialmedia.model.User;
import com.simi.socialmedia.repository.PostRepository;
import com.simi.socialmedia.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class PostServiceImplementation implements PostService{

    @Autowired
    PostRepository postRepository;
    @Autowired
    UserService userService;
    @Autowired
    UserRepository userRepository;


    @Override
    public Post createNewPost(Post post, Integer userId) throws Exception {
        Post newPost = new Post();

        newPost.setUserId(userId);

        newPost.setContent(post.getContent());
        newPost.setCreatedAt(LocalDateTime.now());
        newPost.setTitle(post.getTitle());
        newPost.setImage(post.getImage());
        newPost.setContent(post.getContent());





        postRepository.save(newPost);

        return newPost;

    }

    @Override
    public String deletePost(Integer postId, Integer userId) throws Exception {
        Optional<Post> optionalPost = postRepository.findById(postId);
        Post post = optionalPost.orElseThrow(() -> new Exception("Post not found"));
        if (!Objects.equals(post.getUserId(), userId))
            throw new Exception("You are not authorized to delete this post");
        postRepository.delete(post);
        return "Post deleted successfully";
    }

    @Override
    public List<Post> findPostByUserId(Integer userId) throws Exception {
        return postRepository.findPostByUserId(userId);
    }

    @Override
    public Post findPostById(Integer postId) throws Exception {
        Optional<Post> optionalPost = postRepository.findById(postId);
        Post post = optionalPost.orElseThrow(() -> new Exception("Post not found"));
        return post;
    }

    @Override
    public List<Post> findAllPost() throws Exception {
        return postRepository.findAll() ;
    }

    @Override
    public Post savePost(Integer postId, Integer userId) throws Exception {
        Post post = findPostById(postId);
        User user = userService.findUserById(userId);
        user.getSavedPosts().add(post);
        userRepository.save(user);
        return post;
    }

    @Override
    public Post likePost(Integer postId, Integer userId) throws Exception {
        Post post = findPostById(postId);
        User user = userService.findUserById(userId);
        post.getLiked().add(user);
        postRepository.save(post);
        return post;

    }
}
