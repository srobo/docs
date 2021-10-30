# Student Robotics Documentation

The Student Robotics public documentation.

## Getting Started

1. [Install Ruby][install-ruby]

2. Install Bundler (1.x) and Rake

    ``` shell
    $ gem install 'bundler:~>1' rake
    ```

3. Start the app in development mode

    ```shell
    $ rake dev
    ```

## Making changes

When you've made a change, either push it to a forked repository, or to a
feature branch, and [raise a pull request][raise-a-pr].

[install-ruby]: https://www.ruby-lang.org/en/documentation/installation/
[raise-a-pr]: https://github.com/srobo/docs/pull/new/master

### Navigation Sidebar

The docs navigation sidebar is generated from `_data/sidebar_tree.yaml` as part
of the build process. This file is manually updated in order that we can
explicitly control which files are included, in what order as well as adjust the
page titles.
