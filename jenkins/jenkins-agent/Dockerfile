FROM jenkins/agent:latest

USER root

RUN apt-get update && \
    apt-get install -y docker.io && \
    apt-get clean && \
    # Add jenkins user to docker group
    # This gives jenkins permission to use docker socket
    usermod -aG docker jenkins

USER jenkins