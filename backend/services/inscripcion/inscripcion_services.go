package inscripcion

import (
	inscripcionClient "backend/clients/inscripcion"
	"backend/clients/users"
	"backend/dto"
	errores "backend/extras"
	"backend/model"
	"net/http"
	"time"
)

type inscripService struct{}

type inscrServiceInterface interface {
	InsertInscr(inscripDto dto.InscripcionDto) (dto.InscripcionDto, errores.ApiError)
}

var (
	InscripcionService inscrServiceInterface
)

func init() {
	InscripcionService = &inscripService{}
}

func (s *inscripService) InsertInscr(inscripDto dto.InscripcionDto) (dto.InscripcionDto, errores.ApiError) {
	var inscripcion model.Users_x_courses

	inscripcion.Users_x_courses_id = inscripDto.Id_inscripcion
	inscripcion.User_id = inscripDto.Id_user
	inscripcion.Course_id = inscripDto.Id_course
	inscripcion.Fecha_inscripcion = time.Now()

	_, er := users.UserClient.GetUserById(inscripDto.Id_user)
	if er != nil {
		// Verificar si el error es un NotFoundApiError
		if apiErr, ok := er.(errores.ApiError); ok && apiErr.Status() == http.StatusNotFound {
			return inscripDto, apiErr
		}
		return inscripDto, errores.NewInternalServerApiError("Error al obtener usuario", er)
	}

	inscripcion, err := inscripcionClient.InsertInscr(inscripcion)

	if err != nil {
		return inscripDto, errores.NewInternalServerApiError("Error al insertar inscripción", err)
	}

	var inscResponseDto dto.InscripcionDto
	inscResponseDto.Id_inscripcion = inscripcion.Users_x_courses_id
	inscResponseDto.Id_user = inscripcion.User_id
	inscResponseDto.Id_course = inscripcion.Course_id
	inscResponseDto.Fecha_inscripcion = inscripcion.Fecha_inscripcion

	return inscResponseDto, nil

}
