package main

import (
	"blog-backend/config"
	"blog-backend/handlers"
	"blog-backend/models"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	db := config.SetupDatabase()
	models.Migrate(db)

	handlers.RegisterRoutes(router, db)

	router.Run(":8080")
}
