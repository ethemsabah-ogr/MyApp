package controllers

import (
	"net/http"

	"github.com/ethemsabah/restapi/models"
	"github.com/gin-gonic/gin"
)

type UpdateCategoryInput struct {
	CategoryName string `json:"categoryName"`
}

type UpdateProductInput struct {
	ProductName string  `json:"productName"`
	Price       float32 `json:"price"`
	Stock       int     `json:"stock"`
	CategoryId  uint    `json:"categoryId"`
}

type UpdateCartItemInput struct {
	Quantity  int     `json:"quantity"`
	Total     float32 `json:"total"`
	ProductId uint    `json:"productId"`
	UserId    uint    `json:"userId"`
}

func UpdateCategory(c *gin.Context) {
	var category models.Categories
	if err := models.DB.Where("id = ?", c.Param("id")).First(&category).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "record not found"})
		return
	}

	var input UpdateCategoryInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	updatedCategory := models.Categories{CategoryName: input.CategoryName}

	models.DB.Model(&category).Updates(&updatedCategory)
	c.JSON(http.StatusOK, gin.H{"data": category})
}

func UpdateProduct(c *gin.Context) {
	var product models.Products
	if err := models.DB.Where("id = ?", c.Param("id")).First(&product).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "record not found"})
		return
	}

	var input UpdateProductInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	updatedProduct := models.Products{ProductName: input.ProductName, Price: input.Price, Stock: input.Stock, CategoryId: input.CategoryId}

	models.DB.Model(&product).Updates(&updatedProduct)
	c.JSON(http.StatusOK, gin.H{"data": product})
}

func UpdateCartItem(c *gin.Context) {
	var cartItem models.Carts
	if err := models.DB.Where("id = ?", c.Param("id")).First(&cartItem).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "record not found"})
		return
	}

	var input UpdateCartItemInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	updatedCartItem := models.Carts{Quantity: input.Quantity, Total: input.Total, ProductId: input.ProductId, UserId: input.UserId}

	models.DB.Model(&cartItem).Updates(&updatedCartItem)
	c.JSON(http.StatusOK, gin.H{"data": cartItem})
}
