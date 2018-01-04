task test: :environment do
  system('yarn test')
  system('bundle exec rspec')
end 
