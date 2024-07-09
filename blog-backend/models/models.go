package models

import "gorm.io/gorm"

// model names
var AuthorModel string = "Author"
var PostModel string = "Post"

type Author struct {
	gorm.Model
	Username string `gorm:"unique"`
	Password string
}

type Post struct {
	gorm.Model
	Title    string
	Content  string
	Slug     string `gorm:"uniqueIndex"`
	Image    []byte `gorm:"type:blob"`
	AuthorID uint
	Author   Author
}

func Migrate(db *gorm.DB) {
	db.AutoMigrate(&Author{}, &Post{})
}
