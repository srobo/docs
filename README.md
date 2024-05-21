# Student Robotics Documentation

The Student Robotics public documentation.

## Getting Started

For ease of setup, a Docker container is provided. Simply install Docker and `docker-compose`, and run `docker-compose up`.

Once setup, the site will be accessible on http://localhost:4000/docs/

### Manual

1. [Clone this repo][clone-repo]

1. [Install Ruby][install-ruby]

2. Install Bundler (2.x) and Rake

    ``` shell
    $ gem install bundler rake
    ```

3. Start the app in development mode

    ```shell
    $ rake dev
    ```

## Making changes

When you've made a change, either push it to a forked repository, or to a
feature branch, and [raise a pull request][raise-a-pr].

[clone-repo]: https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository
[install-ruby]: https://www.ruby-lang.org/en/documentation/installation/
[raise-a-pr]: https://github.com/srobo/docs/pull/new/main

### Navigation Sidebar

The docs navigation sidebar is generated from `_data/sidebar_tree.yaml` as part
of the build process. This file is manually updated so that we can
explicitly control which files are included, in what order as well as adjust the
page titles.
