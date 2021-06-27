package main

import (
	"go-react-blog-app/packages/orm/db"

	"github.com/tkrajina/typescriptify-golang-structs/typescriptify"
)

func main() {

	converter := typescriptify.New()
	converter.CreateConstructor = true
	converter.Indent = "  "
	converter.BackupDir = ""
	converter.CreateInterface = true

	converter.Add(db.PostModel{})

	err := converter.ConvertToFile("../models/src/types.ts")
	if err != nil {
		panic(err.Error())
	}
}
