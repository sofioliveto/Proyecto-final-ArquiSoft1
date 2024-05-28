package dto

type LoginDto struct {
	Email    string `json:"username"`
	Password string `json:"password"`
}
