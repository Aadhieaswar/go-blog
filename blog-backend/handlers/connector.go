package handlers

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func RegisterRoutes(router *gin.Engine, db *gorm.DB) {
	RegisterPostsRoute(router, db)
	RegisterUserRoute(router, db)
}
