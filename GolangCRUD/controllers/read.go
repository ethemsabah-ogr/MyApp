package controllers

import (
	"net/http"

	"github.com/ethemsabah/restapi/models"
	"github.com/gin-gonic/gin"
)

// FindCategories retrieves all categories from the database
func FindCategories(c *gin.Context) {
	var categories []models.Categories
	models.DB.Find(&categories)

	c.JSON(http.StatusOK, gin.H{"data": categories})
}

// FindProducts retrieves products based on optional categoryId query parameter
func FindProducts(c *gin.Context) {
	var products []models.Products

	// Get the categoryId query parameter
	categoryId := c.Query("categoryId")

	if categoryId != "" {
		// If categoryId is provided, filter products by categoryId
		models.DB.Where("category_id = ?", categoryId).Find(&products)
	} else {
		// If no categoryId is provided, retrieve all products
		models.DB.Find(&products)
	}

	c.JSON(http.StatusOK, gin.H{"data": products})
}

// FindPersons retrieves all persons from the database
func FindPersons(c *gin.Context) {
	var persons []models.Persons
	models.DB.Find(&persons)

	c.JSON(http.StatusOK, gin.H{"data": persons})
}

func FindCartItems(c *gin.Context) {
	var cartItems []models.Carts

	// Get the userId query parameter
	userId := c.Query("userId")

	if userId != "" {
		// If userId is provided, filter cart items by userId
		models.DB.Where("user_id = ?", userId).Find(&cartItems)
	} else {
		// If no userId is provided, retrieve all cart items
		models.DB.Find(&cartItems)
	}

	c.JSON(http.StatusOK, gin.H{"data": cartItems})
}
