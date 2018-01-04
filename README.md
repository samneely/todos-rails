# README

### Ruby and Node versions

The Ruby and Node versions are set by the `.ruby-version` and `.node-version` files at the root.

### Setup

You will need both the Ruby and Node versions specified for the project installed before proceeding.

Install Postgres in your preferred manner. I prefer using [Postgres.app](https://postgresapp.com/).

Run the Rails setup command and setup the database.

```bash
bin/setup
bin/rails db:setup
```

Install yarn without Node.

```bash
brew install yarn --without-node
```

Install all Javascript related dependencies.

```bash
yarn install
```

### How to run the test suite

A Rake task exists to run both Javascript and Ruby tests. The Ruby tests use RSpec as the framework and test runner.

```bash
bin/rake test
```

Use the following command to run just the Javascript tests.

```bash
yarn test
```

Use the following command to run just the Ruby tests.

```bash
bundle exec rspec
```

Since we are using RSpec as the framework and test runner, you can pass files or directories the RSpec command to run just those tests.

```bash
bundle exec rspec spec/features
```

### Running the application

```bash
bin/rails s
```
