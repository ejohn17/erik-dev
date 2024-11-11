FROM node:20-bullseye-slim

RUN apt update
RUN apt-get install nodejs -y
RUN apt-get install yarn -y

RUN apt-get install -y \
    bash \
    rsync \
    openssh-client \
    wget \
    python3 \
    python3-pip \
    ffmpeg \
    && update-alternatives --install /usr/bin/python python /usr/bin/python3 100 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package.json ./

# Install production dependencies.
RUN yarn install

# Copy local code to the container image.
COPY . ./

RUN yarn build

# Run the web service on container startup.
ENV PORT=3000
EXPOSE 3000
CMD ["yarn", "start"]