package inscripcion

import (
	"backend/clients"
	"backend/model"
	log "github.com/sirupsen/logrus"
)

func InsertInscr(inscripcion model.Users_x_courses) (model.Users_x_courses, error) {
	result := clients.Db.Create(&inscripcion)

	if result.Error != nil {
		log.Error("")
	}
	log.Debug("Inscripcion creada: ", inscripcion.Users_x_courses_id)
	return inscripcion, nil

}
