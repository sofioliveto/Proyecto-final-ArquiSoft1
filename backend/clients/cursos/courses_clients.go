package cursos

import (
	"backend/clients"
	"backend/model"
	log "github.com/sirupsen/logrus"
)

type coursesClient struct{}

type CoursesClientInterface interface {
	GetCourseById(id int) model.Courses
	GetCourses() model.Coursess
	GetCourseByName(query string) model.Coursess
}

var (
	CoursesClient CoursesClientInterface
)

func init() {
	CoursesClient = &coursesClient{}
}

func (s *coursesClient) GetCourseById(id int) model.Courses {
	var course model.Courses
	clients.Db.Where("course_id = ?", id).First(&course)
	log.Debug("Course: ", course)
	return course
}

func (s *coursesClient) GetCourses() model.Coursess {
	var courses model.Coursess
	clients.Db.Find(&courses)

	log.Debug("Courses: ", courses)

	return courses
}

func (s *coursesClient) GetCourseByName(query string) model.Coursess {
	var courses model.Coursess
	clients.Db.Where("nombre LIKE ?", "%"+query+"%").Find(&courses)
	log.Debug("Courses", courses)

	return courses
}
