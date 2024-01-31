package com.simi.socialmedia.service;

import com.simi.socialmedia.model.User;
import com.simi.socialmedia.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImplementation implements UserService{
    @Autowired
    UserRepository userRepository;
    @Override
    public User register(User user) {
        User newUser = userRepository.save(user);
        return newUser;
    }

    @Override
    public User findUserById(Integer id) throws Exception {
        Optional<User> optionalUser = userRepository.findById(id);
        User user = optionalUser.orElseThrow(() -> new Exception("User not found"));
        return user;
    }

    @Override
    public User findUserByEmail(String email) {
        User user = userRepository.findByEmail(email);
        return user;
    }

    @Override
    public User followUser(Integer userId, Integer followerId) throws Exception {
        User user1 = findUserById(userId);
        User user2 = findUserById(followerId);
        user1.getFollowers().add(followerId);
        user2.getFollowings().add(userId);
        userRepository.save(user1);
        userRepository.save(user2);
        return user1;

    }

    @Override
    public User updateUser(Integer userId, User user) throws Exception {
        Optional<User> optionalUser = userRepository.findById(userId);
        User user1 = optionalUser.orElseThrow(() -> new Exception("User not found"));
        if (user.getFirstName() != null)
            user1.setFirstName(user.getFirstName());
        if (user.getLastName() != null)
            user1.setLastName(user.getLastName());
        if (user.getEmail() != null)
            user1.setEmail(user.getEmail());
        if (user.getPassword() != null)
            user1.setPassword(user.getPassword());

        System.out.println(user1);

        return userRepository.save(user1);
    }

    @Override
    public List<User> searchUser(String query) {
        List<User> users = userRepository.searchUser(query);
        return users;
    }
}
