# Use an official Python runtime as a parent image
FROM python:3.10-slim-buster

# Create group, user, and set working directory in one command (improve security)
RUN groupadd -r sipy && \
    useradd -r -g sipy sipy && \
    mkdir -p /tweetme && \
    chown sipy:sipy /tweetme

# Set environment variables
ENV PYTHONUNBUFFERED=1

# Switch to non-root user
USER root

# Set the working directory in the container
WORKDIR /tweetme

# Copy only the build directory contents and requirements.txt into the container
COPY --chown=sipy:sipy build/ /tweetme/build/
                    # build file of dev tweetment to vitual tweetme/build of Dockerfile
COPY --chown=sipy:sipy . /tweetme/
                    # all files of dev tweetme to virtual tweetme of Dockerfile       
# Install requirements and set execute permissions for the entrypoint.sh
RUN pip install --no-cache-dir -r /tweetme/requirements.txt && \
    chmod +x /tweetme/build/entrypoint.sh
    
USER sipy
# Set the entry point for the container (it will access to the path and run all the commands of that path)
ENTRYPOINT ["/tweetme/build/entrypoint.sh"]
