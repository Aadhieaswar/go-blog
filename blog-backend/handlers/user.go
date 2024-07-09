package handlers

import (
	"blog-backend/handlers/dto"
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

	router.GET("/api/user-info",
		func(c *gin.Context) {
			utils.VerifyToken(c, db)
		},
		func(c *gin.Context) {
			HandleGetUserInfo(c, db)
		},
	)

	router.GET("/api/basic-user-info", func(c *gin.Context) {
		HandleGetBasicUserInfo(c, db)
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
		utils.HandleError(c, http.StatusBadRequest, utils.RequestInvalid)
		return
	}

	var user models.Author

	if err := db.Where("username = ?", creds.Username).First(&user).Error; err != nil {
		utils.HandleError(c, http.StatusUnauthorized, utils.LoginFailed)
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(creds.Password)); err != nil {
		utils.HandleError(c, http.StatusUnauthorized, utils.LoginFailed)
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
		utils.HandleError(c, http.StatusInternalServerError, utils.TokenGenerationFailure)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"token": token_string,
	})
}

func HandleGetUserInfo(c *gin.Context, db *gorm.DB) {
	var user models.Author

	user_id := c.DefaultQuery("id", "")

	if user_id == "" {
		user = c.MustGet("user").(models.Author)

		c.JSON(http.StatusOK, dto.UserResponse{
			Username: user.Username,
			ID:       user.ID,
		})
		return
	}

	if err := db.First(&user, user_id).Error; err != nil {
		utils.HandleError(c, http.StatusInternalServerError, utils.Error{
			Message: "Unable to find the user with the given ID: " + user_id,
			Code:    "G-999",
		})
		return
	}

	c.JSON(http.StatusOK, dto.UserResponse{
		Username: user.Username,
		ID:       user.ID,
	})
}

func HandleGetBasicUserInfo(c *gin.Context, db *gorm.DB) {
	var user models.Author

	user_id := c.DefaultQuery("id", "")

	if user_id == "" {
		utils.HandleError(c, http.StatusBadRequest, utils.RequestInvalid)
		return
	}

	if err := db.First(&user, user_id).Error; err != nil {
		utils.HandleError(c, http.StatusInternalServerError, utils.Error{
			Message: "Unable to find the user with the given ID: " + user_id,
			Code:    "G-999",
		})
		return
	}

	c.JSON(http.StatusOK, dto.UserBasicResponse{
		Username: user.Username,
		ID:       user.ID,
	})
}
