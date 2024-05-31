package users

import (
	dto "backend/dto"
	usersService "backend/services/users"
	"github.com/gin-gonic/gin"
	"net/http"
)

func Login(context *gin.Context) {
	var loginRequest dto.LoginDto
	context.BindJSON(&loginRequest)
	response := usersService.Login(loginRequest)
	context.JSON(http.StatusOK, response)
}
