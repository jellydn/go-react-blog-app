package main

import (
	"context"
	"net/http"
	"os"
	"os/signal"
	"time"

	_ "go-react-blog-app/packages/api/docs"
	"go-react-blog-app/packages/api/handlers"
	"go-react-blog-app/packages/api/middlewares"

	"github.com/go-playground/validator"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	echoSwagger "github.com/swaggo/echo-swagger"
)

// @title Golang Blog API
// @version 1.0
// @description Blog API collections

// @contact.name Dung Huynh
// @contact.url http://productsway.com
// @contact.email dung@productsway.com

// @host localhost:1323
// @BasePath /
func main() {
	godotenv.Load()

	e := echo.New()

	// Debug mode
	e.Debug = true

	//-------------------
	//  middleware
	//-------------------
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.Secure())
	e.Use(middleware.CORS())

	//-------------------
	// Custom middleware
	//-------------------
	// Stats
	s := middlewares.NewStats()
	e.Use(s.Process)
	e.GET("/stats", s.Handle) // Endpoint to get stats

	// Server header
	e.Use(middlewares.ServerHeader)

	// Validator
	e.Validator = &CustomValidator{validator: validator.New()}

	// Handler
	e.GET("/swagger/*", echoSwagger.WrapHandler)

	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})

	// Login route
	e.POST("/login", handlers.Login)

	// Post routes
	e.GET("/blog", handlers.PostList)

	r := e.Group("/me")
	// TODO: move secret key to .env file
	r.Use(middleware.JWT([]byte("secret123#@!")))
	r.GET("", handlers.Profile)

	// Start server
	go func() {
		if err := e.Start(":1323"); err != nil && err != http.ErrServerClosed {
			e.Logger.Fatal("shutting down the server")
		}
	}()

	// Wait for interrupt signal to gracefully shutdown the server with a timeout of 10 seconds.
	// Use a buffered channel to avoid missing signals as recommended for signal.Notify
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt)
	<-quit
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if err := e.Shutdown(ctx); err != nil {
		e.Logger.Fatal(err)
	}
}
