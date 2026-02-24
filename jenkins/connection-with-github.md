# API handshake between jenkins & Github. 
1. We will go to the github and create a personal access token (PAT). 
2. We need to store this PAT in jenkins credentials as a secret file & username/password. 
3. Go to jenkins Global setting => connect with github server using the above credentials, test the connection. 

# Webhook call from github whenever events are triggered 
(Push, PR, merge etc)
1. PR is crated in github
2. Code is merged in github
(Event)
Whenever this event occurs => Github will make API call to jenkins webhook and send the event data. 

Install github plugin in Jenkins (We will get the endpoint for webhook)

Webhook is a POST api which will recieve data from remote server. 

Whenever jenkins receives the request in webhook, jenkins should trigger the pipeline. 
Jenkins will check the events in the received webhook. Depending on event:
if event is for PR created jenkins should run the CI pipeline.
if event is for Merged PR, jenkins should run the CD pipeline. 

# Our jenkis server listens
If we are in localhost running the jenkins locally, we need to port forward our port 8080 using ngrok. 
We will get a public url for our jenkins server. 

Setup ngrok account
`https://ngrok.com/`

Download & install grok in your computer. 
`https://dashboard.ngrok.com/get-started/setup/`
Choose your OS

Go to Your AuthToken section in side & copy your auth token & configure the auth token in your local. 
`ngrok config add-authtoken $YOUR_AUTHTOKEN`

Go to the Domains, ngork free plan provides one public domain that will not change. 
Copy the domain name & run following command to forward the domian name to your local port.
`ngrok http url=<your_domain_name> <port>`
Example:
`ngrok http --url=tremendous-deludedly-gudrun.ngrok-free.dev 8080`


# Connecting github repo with jenkins via webhook. 

GO to github repo
Go to settings
Add jenkins url (Ngrok one) in the webhook section. 
`<your gnrok url>/github-webhook/`

Example:
`https://tremendous-deludedly-gudrun.ngrok-free.dev/github-webhook/`