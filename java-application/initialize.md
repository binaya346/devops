# Initialize Spring boot (Spring framework)

## Installation

Install jdk:
`https://www.oracle.com/java/technologies/downloads/`

Install maven for build:
`https://maven.apache.org/download.cgi`

Mac:
`brew update`
`brew install maven`

Linux:
`sudo apt update`
`sudo apt install maven -y`

Windows:
=> Install chocolatey
=> install using chocolatey
`choco install maven -y`


Initiate a spring boot

=> (`javac`) Java compiler (Convert java code into bytecode) (JDK)
=> JVM Runs the bytecode
=> Dependency manager, maven

## JDK
The JDK (Java Development Kit) is the complete "Construction Kit" for Java developers. If you want to write code and turn it into a working application, you must have the JDK.

## What is inside the JDK?
It is not just one program; it is a collection of three main layers:

**The Tools (The Construction Crew):** This includes the Compiler (`javac`), which translates your human-readable text into machine-readable `bytecode`.

**The JRE (The Foundation):** This is the Java Runtime Environment. It is the "floor" the application stands on while it runs.

**The JVM (The Engine):** The Java Virtual Machine is the heart of the system that actually executes the instructions on your specific computer (Mac, Windows, or Linux).


### Understanding Spring Boot Project's Identity. (Tomcat webserver)
When you create a Spring Boot project (via Spring Initializr), you are asked to fill in specific fields. These fields define how your application is identified by the Java ecosystem.

1. Group ID (The Company)
**What it is:** The unique identifier of your organization or "company."

**Format:** It follows a "Reverse Domain Name" pattern (like a website URL backwards).

**Example:** com.devopsclass

**Why we need it:** To prevent name clashes. Two people might create an app called "Marketing," but com.devopsclass.marketing is unique to you.

2. Artifact ID (The Product)
**What it is:** The name of the specific project or "software" you are building.

**Format:** Lowercase letters and hyphens only.

**Example:** inventory-system

**Why we need it:** This becomes the name of your final output file (the .jar file).

1. Name (The Display Name)
**What it is:** The human-readable name of your project.

**Example:** Inventory Management System

4. Package Name (The Address)
**What it is:** The actual folder path inside your code where your Java files live.

**Logic:** It is usually a combination of Group ID + Artifact ID.

**Example:** com.devopsclass.inventory

**Why we need it:** In Java, every file must know its "address." If a file lives in this package, the first line of code MUST be package com.devopsclass.inventory;.


## Understanding Maven wrapper

1. The Global Maven (`mvn -v`)
When you run `mvn -v`, you are talking to the Maven installed directly on your macOS via Homebrew.

Version: 3.9.12.

Location: /opt/homebrew/...

The Issue: This only works on your machine. If you send your code to a friend who hasn't installed Maven yet, their computer will say command not found: mvn.

2. The Maven Wrapper (mvnw)
The Maven Wrapper is a small script (and a few config files) included inside your project folder. It acts as an installer.

wrapperVersion=3.3.4: This is the version of the Wrapper Tool itself (the script that does the downloading). Think of this as the version of the "installer software."

distributionUrl=.../apache-maven-3.9.12...: This is the version of Maven that the script will download and use. This matches your PC exactly!

## What is the pom.xml?
POM stands for Project Object Model. It is an XML file that sits in the root directory of every Maven-based Java project.

Think of it as the Single Source of Truth. Instead of having settings scattered across your IDE (IntelliJ/Eclipse) or hidden in your computer's system variables, every single instruction needed to build your backend is written inside this one file.

## Why do we need it? (The 3 Core Purposes)
1. Dependency Management (The Supply Chain)
In the old days of Java, if you wanted to use a library (like a JSON parser), you had to manually download a .jar file, put it in a folder, and "tell" your computer where it was.

**The Maven Way:** You just write the Name and Version of the library in the pom.xml.

**The DevOps Result:** When you run your Docker build, Maven automatically reaches out to the internet (Maven Central), downloads the library, and caches it. It even downloads the libraries that those libraries need (Transitive Dependencies).

2. Standardized Build Lifecycle
In DevOps, we need automation. We can't have one developer building an app by clicking a button and another using a script. The pom.xml defines a Standard Lifecycle:

`mvn compile`: Turns .java into .class

`mvn test`: Runs your unit tests.

`mvn package`: Bundles everything into an `.jar`. Because this is defined in the pom.xml, your Docker container can run these exact same commands every time.

3. Project Identity (Coordinates)
As we discussed, this file stores the GAV Coordinates (Group, Artifact, Version). This ensures that when the build is finished, the output has a globally unique name

## Running the project
1. The Maven Wrapper (`mvnw`)
Before running, look at your project folder. You will see a file called `mvnw` (Linux/Mac) or `mvnw.cmd` (Windows).

- What is it? 
=> It is a script that downloads the correct version of Maven for you automatically.

Why use it? 
=> So we don't have to manually install Maven on their VMs.

1. Running for Development (The "Fast" Way)
This command compiles the code and starts the application immediately in one step. It is great for testing the `HelloController`.

```bash
# On Linux/Mac:
./mvnw spring-boot:run

# On Windows:
mvnw.cmd spring-boot:run

```
**What happens?**

1. Maven reads the pom.xml.

2. It downloads the "Spring Web" libraries.

3. It starts an Embedded Tomcat Server on port 8080.

4. We can visit `http://localhost:8080` to see the app.

## Installing the packages

`./mvnw clean package -DskipTests`

# Breakdown of the command:
**clean:** Deletes the old `target/` folder so we start with a 100% fresh build.

**package:** Tells Maven to compile the code and wrap it into a `.jar` file.

**-DskipTests:** (Optional) Skips running unit tests to make the build faster for this lab.


## Difference between `run` and `package` command

**The Running Phase (`spring-boot:run`)**
When you execute `./mvnw spring-boot:run`, you are operating in **Development Mode**. This command is designed for a developer's local machine. It performs an "in-memory" build where it compiles your Java files and starts the application immediately from your source folder. However, this process is ephemeral; it doesn't create a portable file that you can move to another server. In a DevOps pipeline, we rarely use this command because it requires the entire source code to be present, which goes against our goal of creating small, secure, and "Invisible" backend containers.

**The Building Phase (`package`)**
On the other hand, `./mvnw package` is the **Production Standard** for DevOps. This command triggers the full Maven lifecycle: it validates your code, compiles it, runs your tests, and finally bundles everything into a single, self-contained file called a **JAR (Java Archive)**. This JAR file, located in the `target/` folder, is your **Build Artifact**. It contains your code, your configurations, and the web server itself. In a professional CI/CD pipeline, this is the most critical step because this one file is what we actually "ship" and place in another server.


## Running first code with maven. 
Open the `pom.xml` file in your project's root directory. Find the `<dependencies>` section and add the following block. This turns a simple Java task into a Web Service.

```bash
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>

```

### Create a Controller
We need to create a Java class that listens for web requests.

Go to the folder: `src/main/java/io/devops/edu/metrics/` (or wherever your package is) and create a file named HelloController.java