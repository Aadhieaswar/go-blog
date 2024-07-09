package main

import (
	"blog-backend/config"
	"blog-backend/handlers"
	"blog-backend/models"
	"log"
	"os"
	"path/filepath"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	logFile, err := os.OpenFile(filepath.Join("logs", "app.log"), os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		log.Fatalf("%v Failed to open log file %v", "S-999", err)
	}
	defer logFile.Close()

	log.SetOutput(logFile)

	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	router.Static("/static", "./static")

	db := config.SetupDatabase()
	models.Migrate(db)

	handlers.RegisterRoutes(router, db)

	router.Run(":8080")
}
