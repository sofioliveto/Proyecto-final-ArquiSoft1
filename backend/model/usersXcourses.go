package model

import "time"

type UsersXCourses struct {
	UsersXCoursesId   int       `gorm:"primaryKey;AUTO_INCREMENT"`
	UserId            int       `gorm:"foreignKey:UserId"`
	CourseId          int       `gorm:"foreignKey:CourseId"`
	fecha_inscripcion time.Time `gorm:"type:date;not null"`
}
