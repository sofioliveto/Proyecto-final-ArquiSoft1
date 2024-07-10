package inscripcion

import (
	"backend/clients"
	"backend/model"
	log "github.com/sirupsen/logrus"
)

type inscripcionClient struct{}

type InscripcionClientInterface interface {
	InsertInscr(inscripcion model.Users_x_courses) (model.Users_x_courses, error)
	GetInscripcion() model.Userss_x_coursess
	GetCourseByUserId(id int) model.Userss_x_coursess
}

var (
	InscripcionClient InscripcionClientInterface
)

func init() {
	InscripcionClient = &inscripcionClient{}
}

func (s *inscripcionClient) InsertInscr(inscripcion model.Users_x_courses) (model.Users_x_courses, error) {
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

func (s *inscripcionClient) GetInscripcion() model.Userss_x_coursess {
	var inscripciones model.Users_x_courses
	clients.Db.Find(&inscripciones)

	log.Debug("Inscripciones: ", inscripciones)

	return inscripciones
}

func (s *inscripcionClient) GetCourseByUserId(id int) model.Userss_x_coursess {
	var inscripciones model.Users_x_courses
	clients.Db.Where("id_user = ?", id).First(&inscripciones)
	log.Debug("Inscripciones: ", inscripciones)

	return inscripciones

}
