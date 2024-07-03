package dto

type UserBasicResponse struct {
	ID       uint   `json:"id"`
	Username string `json:"username"`
}

type UserResponse struct {
	ID       uint   `json:"id"`
	Username string `json:"username"`
}

type PostResponse struct {
	ID      uint              `json:"id"`
	Title   string            `json:"title"`
	Content string            `json:"content"`
	Slug    string            `json:"slug"`
	Author  UserBasicResponse `json:"author"`
}
