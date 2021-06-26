package orm

import (
	"context"
	"go-react-blog-app/packages/orm/db"
)

func GetPostPerPage(page int, limit int) ([]db.PostModel, error) {
	client := db.NewClient()
	if err := client.Prisma.Connect(); err != nil {
		return nil, err
	}

	defer func() {
		if err := client.Prisma.Disconnect(); err != nil {
			panic(err)
		}
	}()

	ctx := context.Background()

	// get published post with pagination
	posts, err := client.Post.FindMany(
		db.Post.Published.Equals(true),
	).Take(limit).Skip((page - 1) * limit).With(db.Post.Comments.Fetch()).With(db.Post.Tags.Fetch()).Exec(ctx)
	if err != nil {
		return nil, err
	}

	return posts, err
}
