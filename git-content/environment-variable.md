# Introduction
Environment variables are dynamic, named key-value pairs that store configuration data, secrets (like API keys), or system settings outside of your application's code, allowing programs to adapt to different environments (development, production) and systems without code changes, affecting processes by providing paths, database URLs, or user profiles. They are external to the code, making applications portable, secure, and configurable at runtime, influencing behavior like temporary file storage or system locale settings. 



Application A
User (Internet) => FE(Network/Internet) => BE(Internal Network) => DB (data)
API KEYS (secrets): `z35pyb9qjdmR4pLoNdQb5HZKHneNFk`

Application B
User (Internet) => FE (Network/Internet) => BE(Internal Network) => DB (data)

Private Information
For each user access token is generated which will expire after a while, 
FE (Token[user A] | API KEY)=> BE

FE & BE stored API Keys. 
API Keys will also be pushed to git ??  Should we ?? 

1. API keys shouldn't be exposed in code. 

Secrets: 
Local: API KEY 1, DB_Password 1
Development: API KEY 2, DB_Password 2
Production: API KEY 3, DB_Password 3

Configuration:
Application_port | application_host
Local: localhost:3030
Development: beta.api.companydomain.com
Production: api.companydomain.com

Database host
local: localhost:3306
Development: 
Production: 

Environment variables: Extension .env

process.env.APPLICATION_HOST

# Git ignore
Git ignore files are 