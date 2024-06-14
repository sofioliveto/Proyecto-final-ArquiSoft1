package inscripcion

import (
	"backend/clients"
	"backend/model"
	log "github.com/sirupsen/logrus"
)

func InsertInscr(inscripcion model.Users_x_courses) (model.Users_x_courses, error) {
	result := clients.Db.Create(&inscripcion)

	if result.Error != nil {
		log.Error("Error al crear la inscripción: ", result.Error)
		return inscripcion, result.Error // Devuelve el error real
	}

	// Registra un mensaje de depuración con el ID de la inscripción creada
	log.Debug("Inscripcion creada: ", inscripcion.Users_x_courses_id)

	// Devuelve la inscripción creada y nil como error (indicando éxito)
	return inscripcion, nil

}
