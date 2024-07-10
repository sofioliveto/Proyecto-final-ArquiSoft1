package inscripcion

import (
	inscripcionClient "backend/clients/inscripcion"
	"backend/clients/users"
	"backend/dto"
	errores "backend/extras"
	"backend/model"
	log "github.com/sirupsen/logrus"
	"net/http"
	"time"
)

type inscripService struct {
	inscripClient inscripcionClient.InscripcionClientInterface
}

type inscrServiceInterface interface {
	InsertInscr(inscripDto dto.InscripcionDto) (dto.InscripcionDto, errores.ApiError)
	GetInscripcion() ([]dto.InscripcionDto, errores.ApiError)
	GetCourseByUserId(inscripcionDto dto.InscripcionDto) ([]dto.InscripcionDto, errores.ApiError)
}

var (
	InscripcionService inscrServiceInterface
)

func initInscrpService(inscripcionesClient inscripcionClient.InscripcionClientInterface) inscrServiceInterface {
	inscripcion := new(inscripService)
	inscripcion.inscripClient = inscripcionesClient
	return inscripcion
}

func init() {
	InscripcionService = initInscrpService(inscripcionClient.InscripcionClient)
}

func (s *inscripService) InsertInscr(inscripDto dto.InscripcionDto) (dto.InscripcionDto, errores.ApiError) {
	var inscripcion model.Users_x_courses

	// Asigna valores desde inscripDto a inscripcion
	inscripcion.Users_x_courses_id = inscripDto.Id_inscripcion
	inscripcion.User_id = inscripDto.Id_user
	inscripcion.Course_id = inscripDto.Id_course
	inscripcion.Fecha_inscripcion = time.Now()

	// Verifica si el usuario existe
	_, er := users.UserClient.GetUserById(inscripDto.Id_user)
	if er != nil {
		// Verificar si el error es un NotFoundApiError
		if apiErr, ok := er.(errores.ApiError); ok && apiErr.Status() == http.StatusNotFound {
			return inscripDto, apiErr
		}
		return inscripDto, errores.NewInternalServerApiError("Error al obtener usuario", er)
	}

	// Inserta la inscripción en la base de datos
	inscripcion, err := s.inscripClient.InsertInscr(inscripcion)
	if err != nil {
		return inscripDto, errores.NewInternalServerApiError("Error al insertar inscripción", err)
	}

	// Prepara el objeto de respuesta
	var inscResponseDto dto.InscripcionDto
	inscResponseDto.Id_inscripcion = inscripcion.Users_x_courses_id
	inscResponseDto.Id_user = inscripcion.User_id
	inscResponseDto.Id_course = inscripcion.Course_id
	inscResponseDto.Fecha_inscripcion = inscripcion.Fecha_inscripcion

	return inscResponseDto, nil
}

func (s *inscripService) GetInscripcion() ([]dto.InscripcionDto, errores.ApiError) {
	inscripciones := s.inscripClient.GetInscripcion()
	var inscripcionesDto []dto.InscripcionDto

	for _, inscripcion := range inscripciones {
		var inscDto dto.InscripcionDto
		inscDto.Id_inscripcion = inscripcion.Users_x_courses_id
		inscDto.Id_user = inscripcion.User_id
		inscDto.Id_course = inscripcion.Course_id
		inscDto.Fecha_inscripcion = inscripcion.Fecha_inscripcion

		inscripcionesDto = append(inscripcionesDto, inscDto)
	}

	log.Debug(inscripcionesDto)
	return inscripcionesDto, nil
}

func (s *inscripService) GetCourseByUserId(inscripcionDto dto.InscripcionDto) ([]dto.InscripcionDto, errores.ApiError) {
	inscripciones := s.inscripClient.GetCourseByUserId(inscripcionDto.Id_user)
	var inscripcionesDto []dto.InscripcionDto

	for _, inscripcion := range inscripciones {
		var inscDto dto.InscripcionDto
		inscDto.Id_inscripcion = inscripcion.Users_x_courses_id
		inscDto.Id_user = inscripcion.User_id
		inscDto.Id_course = inscripcion.Course_id
		inscDto.Fecha_inscripcion = inscripcion.Fecha_inscripcion

		inscripcionesDto = append(inscripcionesDto, inscDto)
	}

	log.Debug(inscripcionDto)
	return inscripcionesDto, nil
}
