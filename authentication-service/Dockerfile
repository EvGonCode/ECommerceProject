FROM openjdk:21-jdk-slim

WORKDIR /authapp

ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} authapp.jar

EXPOSE 8082

ENTRYPOINT ["java", "-jar", "authapp.jar"]