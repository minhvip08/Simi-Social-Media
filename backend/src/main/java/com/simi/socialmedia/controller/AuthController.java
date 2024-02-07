package com.simi.socialmedia.controller;

import com.simi.socialmedia.config.JwtProvider;
import com.simi.socialmedia.model.User;
import com.simi.socialmedia.repository.UserRepository;
import com.simi.socialmedia.request.LoginRequest;
import com.simi.socialmedia.response.AuthResponse;
import com.simi.socialmedia.service.CustomerUserDetailsService;
import com.simi.socialmedia.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController{
    @Autowired
    UserService userService;

    @Autowired
    private UserRepository userRepositry;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CustomerUserDetailsService customerUserDetailsService;

//    /auth/signup
    @PostMapping("/signup")
    public AuthResponse createUser(@RequestBody User user) throws Exception {
        User isExist = userRepositry.findByEmail(user.getEmail());
        if (isExist != null){
            throw new Exception("Email already exist");
        }
        User newUser = new User();
        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));
        newUser.setGender(user.getGender());

        User savedUser = userRepositry.save(newUser);

        Authentication authentication = new UsernamePasswordAuthenticationToken(savedUser.getEmail(), savedUser.getPassword());

        String token = JwtProvider.generateToken(authentication);
        AuthResponse authResponse = new AuthResponse(token, "User created successfully");
        return authResponse;

    }

    @PostMapping("/login")
    public AuthResponse loginUser(@RequestBody LoginRequest loginRequest){
        Authentication authentication = authenticate(loginRequest.getEmail(), loginRequest.getPassword());



        String token = JwtProvider.generateToken(authentication);
        AuthResponse authResponse = new AuthResponse(token, "Login successful");
        return authResponse;

    }

    private Authentication authenticate(String email, String password) {
        UserDetails userDetails = customerUserDetailsService.loadUserByUsername(email);
        if (userDetails == null){
            throw new BadCredentialsException("User not found");
        }
        if (!passwordEncoder.matches(password, userDetails.getPassword())){
            throw new BadCredentialsException("Password is incorrect");
        }
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

    }

}
