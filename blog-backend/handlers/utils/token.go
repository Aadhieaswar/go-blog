package utils

import (
	"blog-backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"gorm.io/gorm"
)

var jwt_key = []byte("my_secret_key")

type Credentials struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type Claims struct {
	Username string `json:"username"`
	jwt.RegisteredClaims
}

func GetJwtKey() []byte {
	return jwt_key
}

func VerifyToken(c *gin.Context, db *gorm.DB) {
	tokenString := c.GetHeader("Authorization")

	if tokenString == "" {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": TokenNotFound,
		})
		c.Abort()
		return
	}

	tokenString = tokenString[len("Bearer "):]
	claims := &Claims{}

	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return jwt_key, nil
	})

	if err != nil || !token.Valid {

		c.JSON(http.StatusUnauthorized, gin.H{
			"error": TokenInvalid,
		})
		c.Abort()
		return
	}

	var user models.Author
	if err := db.Where("username = ?", claims.Username).First(&user).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": DBAuthorNotFound,
		})
		c.Abort()
		return
	}

	c.Set("user", user)
	c.Next()
}
