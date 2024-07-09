package utils

import (
	"log"

	"github.com/gin-gonic/gin"
)

type Error struct {
	Message string `json:"message"`
	Code    string `json:"code"`
}

func HandleError(c *gin.Context, statusCode int, err Error) {
	log.Printf("Error: %v | Code: %v", err.Message, err.Code)

	c.JSON(statusCode, gin.H{
		"error": err,
	})
}

// General
// custom errors use code "G-999"
var LoginFailed = Error{
	Message: "Invalid username and/or password",
	Code:    "G-101",
}

// Server failure
var ImageOpenFailed = Error{
	Message: "Failed to open image",
	Code:    "S-101",
}
var ImageReadFailed = Error{
	Message: "Failed to read image",
	Code:    "S-102",
}

// Request failure
var RequestInvalid = Error{
	Message: "Invalid Request",
	Code:    "R-101",
}
var RequestFileInvalid = Error{
	Message: "Invalid Image Given",
	Code:    "R-102",
}

// Hashing failure
var HashFailed = Error{
	Message: "Failed to hash password",
	Code:    "H-101",
}

// Database failure
var DBCreateAuthorFailed = Error{
	Message: "Failed to create user",
	Code:    "DB-101",
}
var DBGetAllPostsFailure = Error{
	Message: "Failed to fetch posts",
	Code:    "DB-102",
}
var DBCreatePostFailure = Error{
	Message: "Failed to create post",
	Code:    "DB-103",
}
var DBAuthorNotFound = Error{
	Message: "User not found",
	Code:    "DB-104",
}
var DBPostNotFound = Error{
	Message: "Post not found",
	Code:    "DB-105",
}
var DBGetPostFailure = Error{
	Message: "Failed to retrieve post",
	Code:    "DB-106",
}

// Token failure
var TokenGenerationFailure = Error{
	Message: "Failed to generate token",
	Code:    "T-101",
}
var TokenNotFound = Error{
	Message: "No token provided",
	Code:    "T-102",
}
var TokenInvalid = Error{
	Message: "Invalid Token",
	Code:    "T-103",
}
