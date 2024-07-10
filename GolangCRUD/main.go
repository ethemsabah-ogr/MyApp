package main

import (
	"github.com/ethemsabah/restapi/controllers"
	"github.com/ethemsabah/restapi/models"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	models.ConnectDatabase()

	// CORS middleware ekle
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"}, // İzin verilen kaynaklar
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	router.POST("/api/categories", controllers.CreateCategory)
	router.POST("/api/products", controllers.CreateProduct)
	router.POST("/api/bulk-products", controllers.CreateProducts)
	router.POST("/api/register", controllers.CreatePerson)
	router.POST("/api/carts", controllers.CreateCartItem)

	router.GET("/api/categories", controllers.FindCategories)
	router.GET("/api/products", controllers.FindProducts)
	router.GET("/api/persons", controllers.FindPersons)
	router.GET("/api/cart", controllers.FindCartItems)

	router.PATCH("/api/categories/:id", controllers.UpdateCategory)
	router.PATCH("/api/products/:id", controllers.UpdateProduct)
	router.PATCH("/api/carts/:id", controllers.UpdateCartItem)

	router.DELETE("/api/categories/:id", controllers.DeleteCategory)
	router.DELETE("/api/products/:id", controllers.DeleteProduct)
	router.DELETE("/api/carts/:id", controllers.DeleteCartItem)

	router.Run("localhost:8080")
}
