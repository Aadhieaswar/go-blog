package config

import (
	"log"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func SetupDatabase() *gorm.DB {
	db, err := gorm.Open(sqlite.Open("blog.db"), &gorm.Config{})

	if err != nil {
		log.Fatal("Failed to connect to the database: ", err)
	}

	return db
}
