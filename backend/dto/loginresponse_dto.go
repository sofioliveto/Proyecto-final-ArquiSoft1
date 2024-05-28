package dto

type LoginResponseDto struct {
	user_id int    `json:"user_id"`
	token   string `json:"token"`
}
