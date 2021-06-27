package orm

import (
	"context"
	"go-react-blog-app/packages/orm/db"

	"golang.org/x/crypto/bcrypt"
)

func CreateUser(email string, password string) error {
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

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		panic(err)
	}

	_, err = client.User.CreateOne(db.User.Password.Set(string(hashedPassword)), db.User.Email.Set(email)).Exec(ctx)
	if err != nil {
		return err
	}

	return nil
}

func UserSignIn(email string, rawPassword string) error {
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

	user, err := client.User.FindFirst(db.User.Email.Equals(email)).Exec(ctx)
	if err != nil {
		return err
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(rawPassword))

	if err != nil {
		return err
	}

	return nil
}
