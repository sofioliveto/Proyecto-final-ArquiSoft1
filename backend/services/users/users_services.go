package users

import (
	"backend/clients"
	"backend/dto"
	errores "backend/extras"
	"backend/model"
)

type userService struct {
	userClient clients.UserClientInterface
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

func Login(request dto.LoginDto) dto.LoginResponseDto {

	//validar base de datos

	return dto.LoginResponseDto{
		Token: "abcdef123456",
	}
}
