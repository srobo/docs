FROM ruby:3.3

ENV GLOBAL_GEMS=true

WORKDIR /usr/src/docs

RUN git config --global --add safe.directory /usr/src/docs && git config --global --add safe.directory /usr/src/docs/_sass/brand

RUN gem install 'bundler:2.4.22' rake

COPY . ./

RUN rake dependencies

# Install nodejs
RUN curl -fsSL https://deb.nodesource.com/setup_current.x | bash && apt install nodejs --yes

RUN npm ci

CMD ["rake", "dev"]
