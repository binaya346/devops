# Basic
Programming langugage => High level language. 

Humans can read, write, understand easily. 
Basically in english language, with english meaning. 

Computers don't understand these languages. 

High level language => (Compilation) =>  Machine level languge (Computers understand only machine level languge)


JS program => Node js (Runtime environment)(Compile)
Java program => JDK (java development Kit) => Compiles to Machine level (`Bytecode`). 


=> Build (syntax, memory allocation, Compilation, Executiable file)
Heavy packages like `JDK`, `javac`, `jvm`
factory, worker, electricity => Expensive

=> Run Executiable (Runtime)
showroom, less worker. 

# Multistage dockerization
**First stage**: We do heavy work like building the application. It requires heavy tools like JDK. Create a executable. 

**Second stage:** We don't need heavry work like building. We copy just the executeable file from first step leaving behind the heavry tools like JDK. 
