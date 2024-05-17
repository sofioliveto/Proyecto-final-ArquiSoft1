package model

type User struct {
	UserId   int    `gorm:"primaryKey;AUTO_INCREMENT"`
	Email    string `gorm:"type:varchar(100);not null"`
	Password string `gorm:"type:varchar(100);not null"`
	Nombre   string `gorm:"type:varchar(100);not null"`
	Apellido string `gorm:"type:varchar(100);not null"`
	Admin    bool   `gorm:"type:boolean;not null"`
}
