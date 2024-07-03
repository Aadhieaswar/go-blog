package dto

import "blog-backend/models"

func MapToPostResponse(post models.Post) PostResponse {
	return PostResponse{
		ID:      post.ID,
		Title:   post.Title,
		Content: post.Content,
		Slug:    post.Slug,
		Author: UserBasicResponse{
			ID:       post.Author.ID,
			Username: post.Author.Username,
		},
	}

}
