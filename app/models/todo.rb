class Todo < ApplicationRecord
  TITLE_MAX_LENGTH = 80

  validates :title, presence: true, length: { maximum: TITLE_MAX_LENGTH }
end
