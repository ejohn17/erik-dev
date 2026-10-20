FROM node:20-bookworm-slim

# Node and yarn come with the base image. ffmpeg and python3 are for the caption generator's yt-dlp.
RUN apt-get update && apt-get install -y --no-install-recommends \
    bash \
    ca-certificates \
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
# Copying this separately prevents re-running yarn install on every code change.
COPY package.json yarn.lock ./

# Install dependencies with the locked versions from yarn.lock.
RUN yarn install --frozen-lockfile

# Copy local code to the container image.
COPY . ./

RUN yarn build

# Run the web service on container startup.
ENV PORT=3000
EXPOSE 3000
CMD ["yarn", "start"]