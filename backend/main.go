package main

import "backend/clients"

func main() {
	clients.ConnectDatabase()
	//clients.MigrateEntities()
}
