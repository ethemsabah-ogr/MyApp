package models

type Categories struct {
	ID           uint   `json:"id" gorm:"primaryKey;autoIncrement:true;unique"`
	CategoryName string `json:"categoryName"`
}

type Products struct {
	ID          uint       `json:"id" gorm:"primaryKey;autoIncrement:true"`
	ProductName string     `json:"productName"`
	CategoryId  uint       `json:"categoryId"`
	Category    Categories `json:"category" gorm:"foreignKey:CategoryId"`
	Price       float32    `json:"price"`
	Stock       int        `json:"stock"`
}

type Persons struct {
	ID       uint   `json:"id" gorm:"primaryKey;autoIncrement:true"`
	FullName string `json:"fullName"`
	Email    string `json:"email" gorm:"unique;not null"`
	Password string `json:"password" gorm:"not null"`
}

type Carts struct {
	ID        uint    `json:"id" gorm:"primaryKey;autoIncrement:true"`
	Quantity  int     `json:"quantity"`
	Total     float32 `json:"total"`
	ProductId uint    `json:"productId"`
	UserId    uint    `json:"userId"`
}
