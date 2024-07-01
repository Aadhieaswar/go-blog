package handlers

import (
	"blog-backend/handlers/utils"
	"blog-backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func RegisterPostsRoute(router *gin.Engine, db *gorm.DB) {
	router.GET("/api/posts", func(c *gin.Context) {
		HandleGetAllPosts(c, db)
	})

	router.POST("/api/create-post", utils.VerifyToken, func(c *gin.Context) {
		HandleCreatePost(c, db)
	})
}

func HandleGetAllPosts(c *gin.Context, db *gorm.DB) {
	var posts []models.Post

	if err := db.Preload(models.AuthorModel).Find(&posts).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": utils.DBGetAllPostsFailure,
		})
		return
	}

	// TODO: Remove autho info from posts

	c.JSON(http.StatusOK, posts)
}

func HandleCreatePost(c *gin.Context, db *gorm.DB) {
	var post models.Post
	var user models.Author

	username := c.MustGet("username").(string)

	if err := c.ShouldBindJSON(&post); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": utils.Error{
				Message: err.Error(),
				Code:    "G-999",
			},
		})
		return
	}

	if err := db.Where("username = ?", username).First(&user).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": utils.DBAuthorNotFound,
		})
		return
	}

	post.AuthorID = user.ID

	if err := db.Create(&post).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": utils.DBCreatePostFailure,
		})
		return
	}

	c.JSON(http.StatusOK, post)
}

func HandleGetPostByAuthor(c *gin.Context, db *gorm.DB) {
	var posts []models.Post

	var author_username = c.Param("username")

	if err := db.Preload(models.AuthorModel).First(&posts, author_username).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Unable to find posts for author " + author_username,
		})
		return
	}

	c.JSON(http.StatusOK, posts)
}
