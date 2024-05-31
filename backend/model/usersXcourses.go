package model

import "time"

type Users_x_courses struct {
	Users_x_courses_id int       `gorm:"primaryKey;AUTO_INCREMENT"`
	User_id            int       `gorm:"foreignKey:User_id"`
	Course_id          int       `gorm:"foreignKey:Course_id"`
	Fecha_inscripcion  time.Time `gorm:"type:date;not null"`
}
type userss_x_coursess []Users_x_courses
