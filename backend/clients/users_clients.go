package clients

import (
	"backend/model"
	log "github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

var Db *gorm.DB

type userClient struct{}

type UserClientInterface interface {
	GetUserById(id int) model.User
	GetUsers() model.Users
	GetUserByUsername(username string) (model.User, error)
	InsertUser(user model.User) model.User
}

var (
	UserClient UserClientInterface
)

func init() {
	UserClient = &userClient{}
}

func GetUserById(id int) model.Users {
	var user model.Users
	Db.Where("id = ?", id).First(&user)
	log.Debug("User: ", user)
	return user
}

func GetUserByEmail(Email string) (model.Users, error) {
	var user model.Users
	result := Db.Where("email = ?", Email).First(&user)
	if result.Error != nil {
		return user, result.Error
	}
	return user, nil
}

type UserClientInterface interface {
	GetUserById(id int) model.Users
	GetUsers() model.Users
	GetUserByEmail(email string) (model.Users, error)
	InsertUser(user model.Users) model.Users
}
