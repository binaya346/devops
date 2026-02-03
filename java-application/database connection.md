# Connection with the database

1. Dependencies (pom.xml)
Ensure we have these two dependencies. We will use PostgreSQL as it is the industry standard for DevOps demos.

```bash
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>

<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

2. The "DevOps" Configuration (application.properties)
Instead of typing the database password here, we use Placeholders. This tells Spring Boot: 
"*Look for an Environment Variable, and if you don't find it, use this default.*"

```bash
# The 'db' here will be the name of our database service in Docker Compose
spring.datasource.url=jdbc:postgresql://${DB_HOST:localhost}:${DB_PORT:5432}/${DB_NAME:studentdb}
spring.datasource.username=${DB_USER:postgres}
spring.datasource.password=${DB_PASSWORD:password}

# JPA / Hibernate settings
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

3. A Simple "Health Check" Entity
To prove the connection works, create a simple Entity. When the app starts, Hibernate will automatically create this table in the database.
```bash
package com.yourname.project.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

// This tells JPA that this class is a table in our database
@Entity
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;

    // Default Constructor (Required by JPA)
    public Student() {}

    // Constructor for easy testing
    public Student(String name, String email) {
        this.name = name;
        this.email = email;
    }

    // Standard Getters and Setters (English comments as requested)
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
```

4. Add new entity 

What is an Entity?
In the world of Java and Databases, we have a big problem: Java speaks Objects (classes, variables), but Databases speak Tables (rows, columns).

An Entity is a "Translator." It is a simple Java class that is "marked" or "mapped" to a specific table in your database.


# Adding new dependency
To add new dependency in java application, you have to add dependency in `pom.xml` file. 
And install the newly added dependency
`./mvnw clean install`