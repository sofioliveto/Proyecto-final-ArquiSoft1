package inscripcion

import (
	"backend/dto"
	serviceInscr "backend/services/inscripcion"
	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
	"net/http"
)

func InsertInscr(c *gin.Context) {
	// Declara una variable para almacenar los datos de la inscripción
	var inscrDto dto.InscripcionDto

	// Intenta parsear el cuerpo de la solicitud JSON en la variable inscrDto
	err := c.BindJSON(&inscrDto)
	if err != nil {
		// Registra el error y envía una respuesta 400 Bad Request con el mensaje de error
		log.Error("Error al parsear JSON: ", err.Error())
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	// Llama al servicio para insertar la inscripción
	inscrDto, er := serviceInscr.InscripcionService.InsertInscr(inscrDto)
	if er != nil {
		// Si ocurre un error en el servicio, envía una respuesta con el estado y el error
		log.Error("Error al insertar inscripción: ", er.Error())
		c.JSON(http.StatusInternalServerError, er.Error())
		return
	}

	// Si la inserción fue exitosa, envía una respuesta 201 Created con los datos de la inscripción
	c.JSON(http.StatusCreated, inscrDto)
}
