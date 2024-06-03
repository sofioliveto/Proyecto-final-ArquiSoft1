package dto

type TokenDto struct {
	Token   string `json:"token"`
	User_id int    `json:"id_user"`
	Tipo    bool   `json:"tipo"`
}
