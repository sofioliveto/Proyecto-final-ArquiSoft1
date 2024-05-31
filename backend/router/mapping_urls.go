package router

import (
	controllers_users "backend/controllers/users"
)

func mapUrls() {
	// Users Mapping
	router.GET("/user/:id", controllers_users.GetUserById)
	router.POST("/login", controllers_users.Login)
}
