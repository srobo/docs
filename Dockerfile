FROM ruby:2.7

ENV GLOBAL_GEMS=true

WORKDIR /usr/src/docs

RUN git config --global --add safe.directory /usr/src/docs && git config --global --add safe.directory /usr/src/docs/_sass/brand

RUN gem install 'bundler:~>1' rake

RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && apt-get install -y nodejs

COPY . ./

RUN rake dependencies

CMD ["rake", "dev"]
