package inscripcion

import (
	"backend/dto"
	serviceInscr "backend/services/inscripcion"
	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
	"net/http"
)

func InsertInscr(c *gin.Context) {
	var inscrDto dto.InscripcionDto
	err := c.BindJSON(&inscrDto)

	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	inscrDto, er := serviceInscr.InscripcionService.InsertInscr(inscrDto)
	if er != nil {
		c.JSON(er.Status(), er)
		return
	}
	c.JSON(http.StatusCreated, inscrDto)
}
