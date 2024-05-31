package users

import (
	"backend/clients"
	"backend/dto"
	errores "backend/extras"
	"backend/model"
	"github.com/golang-jwt/jwt/v5"
	log "github.com/sirupsen/logrus"
)

type userService struct {
	userClient clients.UserClientInterface
}

var (
	UserService userServiceInterface
)

type userServiceInterface interface {
	GetUserById(id int) (dto.UserDto, errores.ApiError)
	Login(loginDto dto.LoginDto) (dto.LoginResponseDto, errores.ApiError)
}

func initUserService(userClient clients.UserClientInterface) userServiceInterface {
	service := new(userService)
	service.userClient = userClient
	return service
}

func init() {
	UserService = initUserService(clients.UserClient)
}

func (s *userService) GetUserById(id int) (dto.UserDto, errores.ApiError) {
	var user model.Users = s.userClient.GetUserById(id)
	var userDto dto.UserDto
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

func (s *userService) Login(loginDto dto.LoginDto) (dto.LoginResponseDto, errores.ApiError) {

	var user model.Users
	user, err := s.userClient.GetUserByEmail(loginDto.Email)
	var loginResponseDto dto.LoginResponseDto
	loginResponseDto.User_id = -1
	if err != nil {
		return loginResponseDto, errores.NewBadRequestApiError("Usuario no encontrado")
	}
	if user.Password != loginDto.Password && loginDto.Email != "encrypted" {
		return loginResponseDto, errores.NewUnauthorizedApiError("Contraseña incorrecta")
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": loginDto.Email,
		"pass":     loginDto.Password,
	})
	var jwtKey = []byte("secret_key")
	tokenString, _ := token.SignedString(jwtKey)
	if user.Password != tokenString && loginDto.Email == "encrypted" {
		return loginResponseDto, errores.NewUnauthorizedApiError("Contraseña incorrecta")
	}

	loginResponseDto.User_id = user.User_id
	loginResponseDto.Token = tokenString
	log.Debug(loginResponseDto)
	return loginResponseDto, nil
}

func Login(request dto.LoginDto) dto.LoginResponseDto {

	//validar base de datos

	return dto.LoginResponseDto{
		Token: "abcdef123456",
	}
}
