package controllers

import (
	"net/http"

	"github.com/ethemsabah/restapi/models"
	"github.com/gin-gonic/gin"
)

type CreateCategoryInput struct {
	CategoryName string `json:"categoryName" binding:"required"`
}

func CreateCategory(c *gin.Context) {
	var input CreateCategoryInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	category := models.Categories{CategoryName: input.CategoryName}
	models.DB.Create(&category)

	c.JSON(http.StatusOK, gin.H{"data": category})
}

type CreateProductInput struct {
	ProductName string  `json:"productName" binding:"required"`
	Price       float32 `json:"price" binding:"required"`
	Stock       int     `json:"stock"`
	CategoryId  uint    `json:"categoryId" binding:"required"`
}

func CreateProduct(c *gin.Context) {
	var input CreateProductInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	product := models.Products{ProductName: input.ProductName, Price: input.Price, Stock: input.Stock, CategoryId: input.CategoryId}
	models.DB.Create(&product)

	c.JSON(http.StatusOK, gin.H{"data": product})
}

type CreateProductsInput struct {
	Products []CreateProductInput `json:"products" binding:"required,dive"`
}

func CreateProducts(c *gin.Context) {
	var input CreateProductsInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var products []models.Products
	for _, p := range input.Products {
		product := models.Products{
			ProductName: p.ProductName,
			Price:       p.Price,
			Stock:       p.Stock,
			CategoryId:  p.CategoryId,
		}
		products = append(products, product)
	}

	models.DB.Create(&products)

	c.JSON(http.StatusOK, gin.H{"data": products})
}

type CreatePersonInput struct {
	FullName string `json:"fullName"`
	Email    string `json:"email" `
	Password string `json:"password"`
}

func CreatePerson(c *gin.Context) {
	var input CreatePersonInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	person := models.Persons{FullName: input.FullName, Email: input.Email, Password: input.Password}
	models.DB.Create(&person)

	c.JSON(http.StatusOK, gin.H{"data": person})
}

type CreateCartItemInput struct {
	Quantity  int     `json:"quantity"`
	Total     float32 `json:"total"`
	ProductId uint    `json:"productId"`
	UserId    uint    `json:"userId"`
}

func CreateCartItem(c *gin.Context) {
	var input CreateCartItemInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	cartItem := models.Carts{Quantity: input.Quantity, Total: input.Total, ProductId: input.ProductId, UserId: input.UserId}
	models.DB.Create(&cartItem)

	c.JSON(http.StatusOK, gin.H{"data": cartItem})
}
