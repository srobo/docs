# Student Robotics Documentation

The Student Robotics public documentation.

## Getting Started

1. [Clone this repo][clone-repo]

1. [Install Ruby][install-ruby]

2. Install Bundler (2.3 or above) and Rake

    ``` shell
    $ gem install bundler rake
    ```

3. Start the app in development mode

    ```shell
    $ rake dev
    ```

4. View the website at <http://localhost:4000/docs/>

### Docker

If you would prefer to [install Docker][install-docker] and [Docker Compose][install-docker-compose]
rather than Ruby directly, these can be used instead.

Note that this approach exposes the development server to the network you're
using, which may present a security risk.

## Making changes

When you've made a change, either push it to a forked repository, or to a
feature branch, and [raise a pull request][raise-a-pr].

### Spellings

Spell checking is provided via [`cspell`][cspell], a library which integrates
with a number of code editors. Checking is run automatically on pull requests.

If you're using VSCode, be sure to [install Code Spell Checker][vscode-cspell].

To run the checks manually (this is optional) you'll need to:

0. install [NodeJS & `npm`][install-node]

1. run `npm test`

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
