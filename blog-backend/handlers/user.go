package handlers

import (
	"blog-backend/handlers/utils"
	"blog-backend/models"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func RegisterUserRoute(router *gin.Engine, db *gorm.DB) {
	router.POST("/api/create-user", func(c *gin.Context) {
		HandleCreateUser(c, db)
	})

	router.POST("/api/login", func(c *gin.Context) {
		HandleLoginUser(c, db)
	})

	router.GET("/api/user/:id", func(c *gin.Context) {
		HandleGetUserById(c, db)
	})
}

func HandleCreateUser(c *gin.Context, db *gorm.DB) {
	var user models.Author

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": utils.Error{
				Message: err.Error(),
				Code:    "G-999",
			},
		})
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": utils.HashFailed,
		})
		return
	}

	user.Password = string(hashedPassword)

	if err := db.Create(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": utils.DBCreateAuthorFailed,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"user": user.Username,
	})
}

func HandleLoginUser(c *gin.Context, db *gorm.DB) {
	var creds utils.Credentials

	if err := c.ShouldBindJSON(&creds); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": utils.RequestInvalid,
		})
		return
	}

	var user models.Author

	if err := db.Where("username = ?", creds.Username).First(&user).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": utils.LoginFailed,
		})
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(creds.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": utils.LoginFailed,
		})
		return
	}

	expiration_time := time.Now().Add(24 * time.Hour)
	claims := &utils.Claims{
		Username: creds.Username,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expiration_time),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	token_string, err := token.SignedString(utils.GetJwtKey())

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": utils.TokenGenerationFailure,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"token": token_string,
	})
}

func HandleGetUserById(c *gin.Context, db *gorm.DB) {
	var user models.Author

	var user_id = c.Param("id")

	if err := db.First(&user, user_id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Unable to find the user with the given ID: " + user_id,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"User":      user.Username,
		"CreatedAt": user.CreatedAt,
	})
}
