package handlers

import (
	"go-react-blog-app/packages/orm"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

func PostList(c echo.Context) error {
	limit, err := strconv.Atoi(c.QueryParam("limit"))
	if err != nil {
		limit = 10
	}

	page, err := strconv.Atoi(c.QueryParam("page"))
	if err != nil {
		page = 1
	}

	posts, err := orm.GetPostPerPage(page, limit)
	if err != nil {
		return err
	}
	return c.JSON(http.StatusOK, posts)
}
