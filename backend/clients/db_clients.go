package clients

import (
	"backend/model"
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var (
	Db *gorm.DB
)

const (
	dbUsername = "root"
	dbPassword = "margoch"
	dbHost     = "localhost"
	dbPort     = 3306
	dbSchema   = "dbarquisoft1" //
	dsn        = "%s:%s@tcp(%s:%d)/%s?charset=utf8mb4&parseTime=True&loc=Local"
)

func ConnectDatabase() {
	connection := fmt.Sprintf(dsn, dbUsername, dbPassword, dbHost, dbPort, dbSchema)
	var err error
	Db, err = gorm.Open(mysql.Open(connection), &gorm.Config{})

	if err != nil {
		fmt.Println("Error connecting to DB", err)
		panic(err)
	}
	fmt.Println("Connection Established")
}

func MigrateEntities() {
	err := Db.AutoMigrate(&model.Users{}, &model.Courses{}, &model.Users_x_courses{})
	if err != nil {
		fmt.Println("Error migrating to DB", err)
		panic(err)
	}
	fmt.Println("Finishing Migration Database Tables")
}
