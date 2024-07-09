package controllers

import (
	"net/http"
	"strconv"

	"github.com/ethemsabah/restapi/models"
	"github.com/gin-gonic/gin"
)

func DeleteCategory(c *gin.Context) {
	var category models.Categories
	if err := models.DB.Where("id = ? ", c.Param("id")).First(&category).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "record not found"})
		return
	}

	models.DB.Delete(&category)
	c.JSON(http.StatusOK, gin.H{"data": "success"})
}

func DeleteProduct(c *gin.Context) {
	var product models.Products
	if err := models.DB.Where("id = ? ", c.Param("id")).First(&product).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "record not found"})
		return
	}

	models.DB.Delete(&product)
	c.JSON(http.StatusOK, gin.H{"data": "success"})
}

func DeleteCartItem(c *gin.Context) {
	var cartItem models.Carts
	if err := models.DB.Where("id = ?", c.Param("id")).First(&cartItem).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "record not found"})
		return
	}
	// İstekteki userId bilgisini alın
	userIdStr := c.Query("userId")
	if userIdStr == "" {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "userId parameter is required"})
		return
	}

	// userId'yi uint türüne dönüştürün
	userId, err := strconv.ParseUint(userIdStr, 10, 64)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "invalid userId"})
		return
	}

	// Kullanıcıya ait olduğunu kontrol edin
	if cartItem.UserId != uint(userId) {
		c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "you are not allowed to delete this item"})
		return
	}
	models.DB.Delete(&cartItem)

	c.JSON(http.StatusOK, gin.H{"data": "success"})
}
