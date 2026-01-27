# Comprehensive Note: Building vs. Running Java Applications

In a DevOps ecosystem, we distinguish between Development Mode (immediate feedback) and Production Mode.

1. The Core Concepts
**Building:** The process of transforming human-readable `.java` files into machine-readable Bytecode (`.class` files).

**Running:** The process of executing that Bytecode so the application can perform its task or serve web requests.

2. Running in Development Mode (The "Live" Run)
When you use a command like `./mvnw spring-boot:run`, you are running the application without a manual build step.

=> Building time (15min)
=> Pages are fast

=> Development mode (on fly build, no need to allocate specific time for building)
=> Pages are relatively slowly rendered. 

**How it works:** Maven performs an "In-Memory" or temporary compilation. It translates your code into Bytecode on the fly and starts the app immediately.

**Tool Required:** JDK (Java Development Kit). You must have the JDK because the Compiler (javac) is actively working to translate your code while the app starts.

Best For: Fast coding, testing new features, and debugging.

3. Building for Production (The "Package" Step)
In DevOps, we don't ship source code; we ship a Build Artifact => `.jar` runs on JRE. 

The Command: `./mvnw package`.

**The Result:** A single, portable `.jar` (Java Archive) file located in the `target/` folder.

**The Purpose:** This file is a "sealed" version of your app. It contains your compiled code and all the libraries (like Spring Web) it needs to survive on its own.

4. Running the Built Artifact (The "DevOps" Run)
Once the `.jar` file exists, you no longer need the source code or the heavy build tools.

**The Command:** `java -jar target/your-app.jar`.

**Tool Required:** JRE (Java Runtime Environment). Since the "translation" (compilation) is already finished, the computer only needs the lightweight JRE to execute the code.

**Security & Efficiency:** This is why our Multi-stage Dockerfile uses the JDK to build but switches to the JRE to run. It makes the final image smaller and prevents hackers from using your own compiler against you.