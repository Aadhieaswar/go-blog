package handlers

import (
	"blog-backend/handlers/dto"
	"blog-backend/handlers/utils"
	"blog-backend/models"
	"io"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func RegisterPostsRoute(router *gin.Engine, db *gorm.DB) {
	router.GET("/api/posts", func(c *gin.Context) {
		HandleGetAllPosts(c, db)
	})

	router.POST("/api/create-post",
		func(c *gin.Context) {
			utils.VerifyToken(c, db)
		},
		func(c *gin.Context) {
			HandleCreatePost(c, db)
		},
	)

	router.GET("/api/post/:slug", func(c *gin.Context) {
		HandleGetPost(c, db)
	})

	router.GET("/api/post/:slug/image", func(c *gin.Context) {
		HandleGetImageForPost(c, db)
	})

	// router.GET("/api/clean", func(c *gin.Context) {
	// 	HandleClean(c, db)
	// })
}

func HandleGetAllPosts(c *gin.Context, db *gorm.DB) {
	var posts []models.Post

	if err := db.Preload(models.AuthorModel).Find(&posts).Error; err != nil {
		utils.HandleError(c, http.StatusInternalServerError, utils.DBGetAllPostsFailure)
		return
	}

	var response []dto.PostResponse
	for _, post := range posts {
		response = append(response, dto.MapToPostResponse(post))
	}

	c.JSON(http.StatusOK, response)
}

func HandleCreatePost(c *gin.Context, db *gorm.DB) {
	var post models.Post

	post.Title = c.PostForm("title")
	post.Content = c.PostForm("content")
	post.Slug = c.PostForm("slug")

	user := c.MustGet("user").(models.Author)

	post.AuthorID = user.ID

	file, err := c.FormFile("image")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": utils.RequestFileInvalid,
		})
		return
	}

	fileContent, err := file.Open()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": utils.ImageOpenFailed,
		})
		return
	}
	defer fileContent.Close()

	imageData, err := io.ReadAll(fileContent)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": utils.ImageReadFailed,
		})
		return
	}

	post.Image = imageData

	if err := db.Create(&post).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": utils.DBCreatePostFailure,
		})
		return
	}

	c.JSON(http.StatusOK, dto.MapToPostResponse(post))
}

func HandleGetPost(c *gin.Context, db *gorm.DB) {
	var post models.Post

	slug := c.Param("slug")

	if err := db.Preload(models.AuthorModel).Where("slug = ?", slug).First(&post).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{
				"error": utils.DBPostNotFound,
			})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": utils.DBGetPostFailure,
			})
		}
		return
	}

	c.JSON(http.StatusOK, dto.MapToPostResponse(post))
}

// // TODO: Temp route to be deleted on prod (only for development convenience)
// func HandleClean(c *gin.Context, db *gorm.DB) {
// 	var posts []models.Post
// 	result := db.Where("slug = ? OR slug IS NULL", "").Unscoped().Delete(&posts)

// 	if result.Error != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Delete failed", "cause": result.Error})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"message": "clean success", "removed_posts": posts})
// }

func HandleGetImageForPost(c *gin.Context, db *gorm.DB) {
	var post models.Post

	slug := c.Param("slug")

	if err := db.Where("slug = ?", slug).First(&post).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			utils.HandleError(c, http.StatusNotFound, utils.DBPostNotFound)
		} else {
			utils.HandleError(c, http.StatusInternalServerError, utils.DBGetPostFailure)
		}
		return
	}

	if len(post.Image) == 0 {
		defaultImagePath := filepath.Join("static", "default-post.png")
		defaultImage, err := os.ReadFile(defaultImagePath)

		if err != nil {
			utils.HandleError(c, http.StatusInternalServerError, utils.ImageReadFailed)
			return
		}

		c.Data(http.StatusOK, "image/jpeg", defaultImage)
	}

	c.Data(http.StatusOK, "image/jpeg", post.Image)
}

func HandleGetPostsByAuthor(c *gin.Context, db *gorm.DB) {
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
