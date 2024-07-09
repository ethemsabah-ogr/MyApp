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

	router.POST("/categories", controllers.CreateCategory)
	router.POST("/products", controllers.CreateProduct)
	router.POST("/bulk-products", controllers.CreateProducts)
	router.POST("/register", controllers.CreatePerson)
	router.POST("/carts", controllers.CreateCartItem)

	router.GET("/categories", controllers.FindCategories)
	router.GET("/products", controllers.FindProducts)
	router.GET("/persons", controllers.FindPersons)
	router.GET("/cart", controllers.FindCartItems)

	router.PATCH("/categories/:id", controllers.UpdateCategory)
	router.PATCH("/products/:id", controllers.UpdateProduct)
	router.PATCH("/carts/:id", controllers.UpdateCartItem)

	router.DELETE("/categories/:id", controllers.DeleteCategory)
	router.DELETE("/products/:id", controllers.DeleteProduct)
	router.DELETE("/carts/:id", controllers.DeleteCartItem)

	router.Run("localhost:8080")
}
