# Prerequisites
=> Install JDK 25
=> Install maven

# Running the application in development mode
`./mvnw spring-boot:run`

# Building the application
`./mvnw clean package`

Make sure target folder is created with a `.jar` file inside.

# Running the build jar file
`java -jar <name of jar file>`

# Building the image
`docker build -t spring-boot-image .`

# Running the container
`docker run -d -p 8080:8080 --name spring-boot-application spring-boot-image`