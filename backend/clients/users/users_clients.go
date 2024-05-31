package users

import (
	"backend/model"
	log "github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

var Db *gorm.DB

type userClient struct{}

type UserClientInterface interface {
	GetUserById(id int) model.Users
	GetUserByEmail(email string) (model.Users, error)
}

var (
	UserClient UserClientInterface
)

func init() {
	UserClient = &userClient{}
}

func (s *userClient) GetUserById(id int) model.Users {
	var user model.Users
	Db.Where("user_id = ?", id).First(&user)
	log.Debug("user: ", user)

	return user
}

func (s *userClient) GetUserByEmail(Email string) (model.Users, error) {
	var user model.Users
	result := Db.Where("email = ?", Email).First(&user)
	if result.Error != nil {
		return user, result.Error
	}
	return user, nil
}
