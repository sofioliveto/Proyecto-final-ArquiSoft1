package router

import (
	controllers_courses "backend/controllers/cursos"
	controllers_inscripcion "backend/controllers/inscripcion"
	controllers_users "backend/controllers/users"
)

func mapUrls() {
	//Users Mapping
	router.GET("/user/:id", controllers_users.GetUserById)
	router.POST("/login", controllers_users.Login)

	//Courses mapping
	router.GET("/courses/:course_id", controllers_courses.GetCourseById)
	router.GET("/search", controllers_courses.GetCourses)
	router.GET("/search/:name", controllers_courses.GetCoursesByName)

	//inscripcion mapping
	router.POST("/inscripcion", controllers_inscripcion.InsertInscr)
	router.GET("/inscripciones", controllers_inscripcion.GetInscripcion)
	router.GET("/inscripciones/:id", controllers_inscripcion.GetCourseByUserId)

}
