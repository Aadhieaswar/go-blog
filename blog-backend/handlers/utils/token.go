package utils

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
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

func VerifyToken(c *gin.Context) {
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

		fmt.Println(token)
		fmt.Println(claims)

		c.JSON(http.StatusUnauthorized, gin.H{
			"error": TokenInvalid,
		})
		c.Abort()
		return
	}

	c.Set("username", claims.Username)
	c.Next()
}
