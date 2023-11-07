package com.example.grifo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class GrifoApplication {

	public static void main(String[] args) {
		SpringApplication.run(GrifoApplication.class, args);
	}

}
