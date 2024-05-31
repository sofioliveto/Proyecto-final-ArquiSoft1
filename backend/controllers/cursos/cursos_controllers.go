package cursos

import (
	"backend/dto"
	servicios "backend/services/cursos"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

func GetCourseById(c *gin.Context) {
	var courseDto dto.CourseDto
	id, _ := strconv.Atoi(c.Param("course_id"))
	courseDto, err := servicios.CourseService.GetCourseById(id)

	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, courseDto)
}

func GetCourses(c *gin.Context) {
	var coursesDto dto.CoursesDto
	var err error

	coursesDto, err = servicios.CourseService.GetCourses()
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, coursesDto)
}

func GetCoursesByName(c *gin.Context) {
	var coursesDto dto.CoursesDto
	query := c.Param("searchQuery")
	coursesDto, err := servicios.CourseService.GetCoursesByName(query)

	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	if len(coursesDto) == 0 {
		c.JSON(http.StatusOK, []dto.CourseDto{})
		return
	}
	c.JSON(http.StatusOK, coursesDto)
}
