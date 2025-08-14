# Use an official OpenJDK image as a base
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the compiled .jar file into the container
COPY target/cleaning-service.jar /app/cleaning-service.jar

# Expose the port your application will run on
EXPOSE 8080

# Command to run the Spring Boot application
CMD ["java", "-jar", "cleaning-service.jar"]
