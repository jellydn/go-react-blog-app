// go:generate go run github.com/prisma/prisma-client-go generate
package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"

	"orm/db"
)

func main() {
	if err := run(); err != nil {
		panic(err)
	}
}

func run() error {
	client := db.NewClient()
	if err := client.Prisma.Connect(); err != nil {
		return err
	}

	defer func() {
		if err := client.Prisma.Disconnect(); err != nil {
			panic(err)
		}
	}()

	ctx := context.Background()

	// create a post
	createdPost, err := client.Post.CreateOne(
		db.Post.Title.Set("Hi from Prisma!"),
		db.Post.Published.Set(true),
		db.Post.Desc.Set("Prisma is a database toolkit and makes databases easy."),
	).Exec(ctx)
	if err != nil {
		return err
	}

	result, _ := json.MarshalIndent(createdPost, "", "  ")
	fmt.Printf("created post: %s\n", result)

	// find a single post
	post, err := client.Post.FindUnique(
		db.Post.ID.Equals(createdPost.ID),
	).Exec(ctx)
	if err != nil {
		return err
	}

	result, _ = json.MarshalIndent(post, "", "  ")
	fmt.Printf("post: %s\n", result)

	// for optional/nullable values, you need to check the function and create two return values
	// `desc` is a string, and `ok` is a bool whether the record is null or not. If it's null,
	// `ok` is false, and `desc` will default to Go's default values; in this case an empty string (""). Otherwise,
	// `ok` is true and `desc` will be "my description".
	desc, ok := post.Desc()
	if !ok {
		return fmt.Errorf("post's description is null")
	}

	fmt.Printf("The posts's description is: %s\n", desc)

	post, err = client.Post.CreateOne(
		db.Post.Title.Set("My new post"),
		db.Post.Published.Set(true),
		db.Post.Desc.Set("Hi there."),
		db.Post.ID.Set("222"),
	).Exec(ctx)
	if err != nil {
		return err
	}

	log.Printf("post: %+v", post)

	// then create a comment
	comment, err := client.Comment.CreateOne(
		db.Comment.Content.Set("my description"),
		// link the post we created before
		db.Comment.Post.Link(
			db.Post.ID.Equals(post.ID),
		),
	).Exec(ctx)
	if err != nil {
		return err
	}

	log.Printf("post: %+v", comment)

	// return all published posts
	posts, err := client.Post.FindMany(
		db.Post.Published.Equals(true),
	).Exec(ctx)
	if err != nil {
		return err
	}

	log.Printf("published posts: %+v", posts)

	// insert a few new comments
	_, err = client.Comment.CreateOne(
		db.Comment.Content.Set("first comment"),
		// link the post we created before
		db.Comment.Post.Link(
			db.Post.ID.Equals("222"),
		),
	).Exec(ctx)
	if err != nil {
		return err
	}
	_, err = client.Comment.CreateOne(
		db.Comment.Content.Set("second comment"),
		// link the post we created before
		db.Comment.Post.Link(
			db.Post.ID.Equals("222"),
		),
	).Exec(ctx)
	if err != nil {
		return err
	}

	// return all comments from a post with a given id
	comments, err := client.Comment.FindMany(
		db.Comment.Post.Where(
			db.Post.ID.Equals("222"),
		),
	).Exec(ctx)
	if err != nil {
		return err
	}

	log.Printf("comments of post with id 222: %+v", comments)

	// return the first two comments from a post with which contains a given title, and sort by descending date
	orderedComments, err := client.Comment.FindMany(
		db.Comment.Post.Where(
			db.Post.ID.Equals("222"),
		),
	).Take(2).OrderBy(
		db.Comment.CreatedAt.Order(db.DESC),
	).Exec(ctx)
	if err != nil {
		return err
	}

	log.Printf("ordered comments: %+v", orderedComments)

	// return a post by its id including 5 of its comments
	post, err = client.Post.FindUnique(
		db.Post.ID.Equals("222"),
	).With(
		// also fetch 3 this post's comments
		db.Post.Comments.Fetch().Take(3),
	).Exec(ctx)
	if err != nil {
		return err
	}

	// will log post and its comments
	log.Printf("post: %+v", post)
	return nil
}
