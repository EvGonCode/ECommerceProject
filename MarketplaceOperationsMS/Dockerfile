FROM openjdk:21-jdk-slim

WORKDIR /mainapp

ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} mainapp.jar

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "mainapp.jar"]