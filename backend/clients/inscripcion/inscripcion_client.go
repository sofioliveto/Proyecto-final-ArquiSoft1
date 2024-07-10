package inscripcion

import (
	"backend/clients"
	"backend/model"
	log "github.com/sirupsen/logrus"
)

type inscripcionClient struct{}

type InscripcionClientInterface interface {
	InsertInscr(inscripcion model.Users_x_courses) (model.Users_x_courses, error)
	GetInscripcion() []model.Users_x_courses
	GetCourseByUserId(id int) []model.Users_x_courses
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
		return inscripcion, result.Error
	}

	log.Debug("Inscripcion creada: ", inscripcion.Users_x_courses_id)
	return inscripcion, nil
}

func (s *inscripcionClient) GetInscripcion() []model.Users_x_courses {
	var inscripciones []model.Users_x_courses
	clients.Db.Find(&inscripciones)

	log.Debug("Inscripciones: ", inscripciones)
	return inscripciones
}

func (s *inscripcionClient) GetCourseByUserId(id int) []model.Users_x_courses {
	var inscripciones []model.Users_x_courses
	clients.Db.Where("id_user = ?", id).Find(&inscripciones)

	log.Debug("Inscripciones: ", inscripciones)
	return inscripciones
}
