package cursos

import (
	courseClient "backend/clients/cursos"
	"backend/dto"
	errores "backend/extras"
	"backend/model"
	log "github.com/sirupsen/logrus"
)

type courseService struct {
	coursesClient courseClient.CoursesClientInterface
}

type coursesServiceInterface interface {
	GetCourseById(id int) (dto.CourseDto, errores.ApiError)
	GetCourses() (dto.CoursesDto, errores.ApiError)
	GetCoursesByName(query string) (dto.CoursesDto, errores.ApiError)
}

var (
	CourseService coursesServiceInterface
)

func initCourseService(coursesClient courseClient.CoursesClientInterface) coursesServiceInterface {
	course := new(courseService)
	course.coursesClient = coursesClient
	return course
}

func init() {
	CourseService = initCourseService(courseClient.CoursesClient)
}

func (s *courseService) GetCourseById(id int) (dto.CourseDto, errores.ApiError) {

	var course model.Courses = s.coursesClient.GetCourseById(id)
	var coursesDto dto.CourseDto

	if course.Course_id < 0 {
		return coursesDto, errores.NewBadRequestApiError("course not found")
	}

	coursesDto.Course_id = course.Course_id
	coursesDto.Nombre = course.Nombre
	coursesDto.Profesor_id = course.Profesor_id
	coursesDto.Categoria = course.Categoria
	coursesDto.Descripcion = course.Descripcion
	coursesDto.Valoracion = course.Valoracion
	coursesDto.Duracion = course.Duracion
	coursesDto.Requisitos = course.Requisitos
	coursesDto.Url_image = course.Url_image
	coursesDto.Fecha_inicio = course.Fecha_inicio
	return coursesDto, nil
}

func (s *courseService) GetCourses() (dto.CoursesDto, errores.ApiError) {

	var courses model.Coursess = s.coursesClient.GetCourses()
	var coursesDto dto.CoursesDto

	for _, course := range courses {
		var courseDto dto.CourseDto
		courseDto.Course_id = course.Course_id
		courseDto.Nombre = course.Nombre
		courseDto.Profesor_id = course.Profesor_id
		courseDto.Categoria = course.Categoria
		courseDto.Descripcion = course.Descripcion
		courseDto.Valoracion = course.Valoracion
		courseDto.Duracion = course.Duracion
		courseDto.Requisitos = course.Requisitos
		courseDto.Url_image = course.Url_image
		courseDto.Fecha_inicio = course.Fecha_inicio
		coursesDto = append(coursesDto, courseDto)
	}

	log.Debug(coursesDto)
	return coursesDto, nil
}

func (s *courseService) GetCoursesByName(query string) (dto.CoursesDto, errores.ApiError) {
	var courses model.Coursess
	courses = s.coursesClient.GetCourseByName(query)
	var coursesDto dto.CoursesDto

	for _, course := range courses {
		var courseDto dto.CourseDto
		courseDto.Course_id = course.Course_id
		courseDto.Nombre = course.Nombre
		courseDto.Profesor_id = course.Profesor_id
		courseDto.Categoria = course.Categoria
		courseDto.Descripcion = course.Descripcion
		courseDto.Valoracion = course.Valoracion
		courseDto.Duracion = course.Duracion
		courseDto.Requisitos = course.Requisitos
		courseDto.Url_image = course.Url_image
		courseDto.Fecha_inicio = course.Fecha_inicio

		coursesDto = append(coursesDto, courseDto)
	}

	log.Debug(coursesDto)
	return coursesDto, nil
}
