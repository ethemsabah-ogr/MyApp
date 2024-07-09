package models

import (
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

const (
	username = "root"
	password = "384367"
	dbName   = "database"
	dbHost   = "localhost"
	dbPort   = "3306"
)

var DB *gorm.DB

func ConnectDatabase() {
	dsn := username + ":" + password + "@tcp(" + dbHost + ":" + dbPort + ")/" + dbName + "?charset=utf8mb4&parseTime=True&loc=Local"
	database, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to database!")
	}
	database.AutoMigrate(&Categories{})
	database.AutoMigrate(&Products{})

	DB = database
}
