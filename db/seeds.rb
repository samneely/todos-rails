# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Todo.find_or_create_by!(title: 'Wash the dishes')
Todo.find_or_create_by!(title: 'Take out the recycling')
Todo.find_or_create_by!(title: 'Play video games')
