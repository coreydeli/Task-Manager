package main

import (
	"net/http"
	"log"
)

func main() {
	fs := http.FileServer(http.Dir("./static"))
	http.Handle("/", fs)

	log.Println("Frontend server running on port 8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}