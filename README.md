# Student Robotics Documentation

The Student Robotics public documentation.

## Getting Started

1. [Clone this repo][clone-repo]

1. [Install Ruby][install-ruby]

1. Install Bundler (2.3 or above) and Rake

    ``` shell
    $ gem install bundler rake
    ```

1. Start the app in development mode

    ```shell
    $ rake dev
    ```

1. View the website at <http://localhost:4000/docs/>

### Docker

If you would prefer to [install Docker][install-docker] and [Docker Compose][install-docker-compose]
rather than Ruby directly, these can be used instead.

Note that this approach exposes the development server to the network you're
using, which may present a security risk.

## Making changes

When you've made a change, either push it to a forked repository, or to a
feature branch, and [raise a pull request][raise-a-pr].

### Validation

We have a number of checks which run against the docs to ensure they are ready
to publish, including internal links checks and spelling checks.

Spell checking is provided via [`cspell`][cspell], a library which integrates
with a number of code editors. Checking is run automatically on pull requests.

If you're using VSCode, be sure to install the [Code Spell Checker][vscode-cspell]
extension.

To run the checks manually (this is optional, but encouraged if making
non-trivial changes) you'll need to:

0. install [NodeJS & `npm`][install-node]

1. run `npm install` (to install the spellings libraries)

1. run `rake validate` to run all the checks

New spellings can be added to `.spelling`. Be sure to spell added words correctly!

### Navigation Sidebar

The docs navigation sidebar is generated from `_data/sidebar_tree.yaml` as part
of the build process. This file is manually updated so that we can
explicitly control which files are included, in what order as well as adjust the
page titles.


[clone-repo]: https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository
[install-ruby]: https://www.ruby-lang.org/en/documentation/installation/
[install-docker]: https://docs.docker.com/engine/install/
[install-docker-compose]: https://docs.docker.com/compose/install/
[raise-a-pr]: https://github.com/srobo/docs/pull/new/main
[cspell]: https://cspell.org/
[vscode-cspell]: https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker
[install-node]: https://downloads.nodesource.com/
