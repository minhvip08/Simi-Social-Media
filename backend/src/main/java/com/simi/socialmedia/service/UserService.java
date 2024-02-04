package com.simi.socialmedia.service;

import com.simi.socialmedia.exception.UserException;
import com.simi.socialmedia.model.User;

import java.util.List;

public interface UserService {
    public User register(User user);
    public User findUserById(Integer id) throws UserException;
    public User findUserByEmail(String email);
    public User followUser(Integer userId, Integer followerId) throws UserException;
    public User updateUser(Integer id, User user) throws UserException;
    public List<User> searchUser(String query);

    public User findUserByJwt(String jwt) throws UserException;
}
