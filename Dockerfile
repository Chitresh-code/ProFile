# Use the official Python image from the Docker Hub
FROM python:3.11-slim

# Install PostgreSQL client libraries
RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory in the container
WORKDIR /backend

# Copy the requirements file
COPY backend/requirements.txt .

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire project
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Command to run the application
CMD ["python", "backend/manage.py", "runserver", "0.0.0.0:8000"]