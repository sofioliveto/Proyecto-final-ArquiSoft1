package users

import (
	"backend/clients/users"
	"backend/dto"
	errores "backend/extras"
	"backend/model"
	"crypto/md5"
	"encoding/hex"
	"github.com/golang-jwt/jwt/v5"
	log "github.com/sirupsen/logrus"
)

type userService struct{}

var (
	UserService userServiceInterface
)

type userServiceInterface interface {
	GetUserById(id int) (dto.UserDto, errores.ApiError)
	Login(loginDto dto.LoginDto) (dto.TokenDto, errores.ApiError)
}

/*func initUserService(userClient users.UserClientInterface) userServiceInterface {
	service := new(userService)
	service.userClient = userClient
	return service
}*/

func init() {
	UserService = &userService{}
}

func (s *userService) GetUserById(id int) (dto.UserDto, errores.ApiError) {
	var user model.Users
	user, err := users.UserClient.GetUserById(id)
	var userDto dto.UserDto

	if err != nil {
		return userDto, errores.NewBadRequestApiError("user not found")
	}

	if user.User_id == 0 {

		return userDto, errores.NewBadRequestApiError("user not found")
	}
	userDto.User_id = user.User_id
	userDto.Email = user.Email
	userDto.Password = user.Password
	userDto.Nombre = user.Nombre
	userDto.Apellido = user.Apellido
	userDto.Admin = user.Admin
	return userDto, nil
}

var jwtKey = []byte("secret_key")

func (s *userService) Login(loginDto dto.LoginDto) (dto.TokenDto, errores.ApiError) {

	log.Debug(loginDto)
	var user model.Users
	var tokenDto dto.TokenDto
	user, err := users.UserClient.GetUserByEmail(loginDto.Email)

	if err != nil {
		return tokenDto, errores.NewBadRequestApiError("Usuario no encontrado")
	}
	var pswMd5 = md5.Sum([]byte(loginDto.Password))
	//convertimos a hexadecimal
	pswMd5string := hex.EncodeToString(pswMd5[:])

	if pswMd5string == user.Password {
		token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
			"User_id": user.User_id,
		})
		tokenString, _ := token.SignedString(jwtKey)
		tokenDto.User_id = user.User_id
		tokenDto.Token = tokenString
		return tokenDto, nil

	} else {
		return tokenDto, errores.NewBadRequestApiError("Contraseña incorrecta")
	}

}
