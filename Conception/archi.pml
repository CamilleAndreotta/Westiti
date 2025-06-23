@startuml architecture
left to right direction

component Frontend

component Server {

  port HTTP

  component ReverseProxy [
    ReverseProxy
    nginx:1.21
  ]

  component PrismaStudio

  component API
  database database {
    
    component PostgreSQL [
      PostgreSQL
      postgis/postgis:13-master
    ]
  }
}

Frontend -- HTTP
HTTP -- ReverseProxy
ReverseProxy -- PrismaStudio
PrismaStudio -- PostgreSQL
ReverseProxy -- API

API -- PostgreSQL

@enduml