FROM resin/raspberrypi3-node:8

RUN apt-get update && apt-get install -y apt-transport-https && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

# Install other apt deps
RUN apt-get update && apt-get install -y \
      apt-utils \
      clang \
      xserver-xorg-core \
      xserver-xorg-input-all \
      xserver-xorg-video-fbdev \
      xorg \
      libdbus-1-dev \
      libgtk2.0-0 \
      libgtk-3-0 \
      libnotify-dev \
      libgnome-keyring-dev \
      libgconf2-dev \
      libasound2-dev \
      libcap-dev \
      libcups2-dev \
      libxtst-dev \
      libxss1 \
      libnss3-dev \
      fluxbox \
      libsmbclient \
      libssh-4 \
      fbset \
      libexpat-dev \
      yarn && rm -rf /var/lib/apt/lists/*

# Set Xorg and FLUXBOX preferences
RUN mkdir ~/.fluxbox
RUN echo "xset s off" > ~/.fluxbox/startup && echo "xserver-command=X -s 0 dpms" >> ~/.fluxbox/startup
RUN echo "#!/bin/bash" > /etc/X11/xinit/xserverrc \
&& echo "" >> /etc/X11/xinit/xserverrc \
&& echo 'exec /usr/bin/X -s 0 dpms -nocursor -nolisten tcp "$@"' >> /etc/X11/xinit/xserverrc

# Move to app dir
WORKDIR /usr/src/app

# Move package.json to filesystem
COPY ./package.json ./
COPY ./yarn.lock ./

# Install npm modules for the application
# Install dev deps so we can build app
RUN JOBS=MAX yarn install --unsafe-perm \
&& node_modules/.bin/electron-rebuild

# Move app to filesystem
COPY . .

# Build react app
RUN JOBS=MAX yarn build

## uncomment if you want systemd
ENV INITSYSTEM on

# Start app
CMD ["bash", "/usr/src/app/start.sh"]
