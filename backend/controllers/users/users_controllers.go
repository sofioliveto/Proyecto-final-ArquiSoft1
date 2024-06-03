package users

import (
	dto "backend/dto"
	service "backend/services/users"
	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
	"net/http"
	"strconv"
)

/*func Login(context *gin.Context) {
	var loginRequest dto.LoginDto
	context.BindJSON(&loginRequest)
	response := usersService.Login(loginRequest)
	context.JSON(http.StatusOK, response)
}*/

func GetUserById(c *gin.Context) {
	log.Debug("User id: " + c.Param("id"))

	// Get Back User

	var userDto dto.UserDto
	id, _ := strconv.Atoi(c.Param("id"))
	userDto, err := service.UserService.GetUserById(id)
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}
	c.JSON(http.StatusOK, userDto)
}

func Login(c *gin.Context) {
	var loginDto dto.LoginDto
	er := c.BindJSON(&loginDto)

	if er != nil {
		log.Error(er.Error())
		c.JSON(http.StatusBadRequest, er.Error())
		return
	}

	log.Debug(loginDto)

	var loginResponseDto dto.LoginResponseDto
	loginResponseDto, err := service.UserService.Login(loginDto)
	if err != nil {
		if err.Status() == 400 {
			c.JSON(http.StatusBadRequest, err.Error())
			return
		}
		c.JSON(http.StatusForbidden, err.Error())
		return
	}

	c.JSON(http.StatusOK, loginResponseDto)
}
