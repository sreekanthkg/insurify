package com.stackroute.authentication.service.model;

import lombok.*;


import javax.persistence.*;


@Data
@Entity
@NoArgsConstructor
@Table(name = "User")
public class UserCredentials {
    @Id

    private String emailId;
    private String password;
     private String userType;

//@Enumerated(EnumType.STRING)
//@Column(name= "auth_provider")
//    private AuthenticationProvider authenticationProvider;



}