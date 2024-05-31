package dto

import "time"

type CourseDto struct {
	Course_id    int       `json:"course_id"`
	Nombre       string    `gorm:"nombre"`
	Profesor_id  int       `gorm:"profesor_id"`
	Categoria    string    `gorm:"categoria"`
	Descripcion  string    `gorm:"descripcion"`
	Valoracion   float64   `gorm:"valoracion"`
	Duracion     int       `gorm:"duracion"`
	Requisitos   string    `gorm:"requisitos"`
	Url_image    string    `gorm:"url_image"`
	Fecha_inicio time.Time `gorm:"fecha_inicio"`
}

type CoursesDto []CourseDto
