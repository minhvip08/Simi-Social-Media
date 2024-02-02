package com.simi.socialmedia.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;


import javax.crypto.SecretKey;
import java.util.Date;

public class JwtProvider {
    private static final SecretKey secretKey = Keys.hmacShaKeyFor(JwtConstant.JWT_SECRET_KEY.getBytes());
    public static String generateToken(Authentication atuh){
        return Jwts.builder()
                .setIssuer("Simi")
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + 864000000))
                .claim("email", atuh.getName())
                .signWith(secretKey)
                .compact();
    }

    public static String getEmailFromJwtToken(String jwt){
//        Bearer rokwn
        jwt = jwt.substring(7);
        Claims claims = Jwts.parser()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(jwt)
                .getBody();
        return String.valueOf(claims.get("email"));

    }
}
