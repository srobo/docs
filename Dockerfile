FROM ruby:2.7

ENV GLOBAL_GEMS=true

WORKDIR /usr/src/docs

RUN git config --global --add safe.directory /usr/src/docs && git config --global --add safe.directory /usr/src/docs/_sass/brand

RUN gem install 'bundler:2.4.22' rake

COPY . ./

RUN rake dependencies

CMD ["rake", "dev"]
