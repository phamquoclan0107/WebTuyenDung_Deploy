# ============================================================
#  Stage 1 — Build với Maven
# ============================================================
FROM maven:3.9.6-eclipse-temurin-17 AS builder

WORKDIR /app

# Cache layer dependency trước
COPY pom.xml .
RUN mvn dependency:go-offline -q

# Copy source rồi build
COPY src ./src
RUN mvn clean package -DskipTests -q

# ============================================================
#  Stage 2 — Runtime image nhẹ
# ============================================================
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Non-root user
RUN addgroup -S spring && adduser -S spring -G spring

COPY --from=builder /app/target/*.jar app.jar

RUN chown spring:spring app.jar

USER spring

EXPOSE 8080

ENTRYPOINT ["java", \
  "-XX:+UseContainerSupport", \
  "-XX:MaxRAMPercentage=75.0", \
  "-Djava.security.egd=file:/dev/./urandom", \
  "-jar", "app.jar"]