# Multi-stage build: Use nginx on Alpine Linux 3.20 to replace EOL versions
# This addresses the migration from Alpine 3.14, 3.16, and 3.18 which have reached EOL
FROM nginx:1.27-alpine3.20

# Copy all application files to nginx web root
COPY . /usr/share/nginx/html/

# Configure nginx for serving static files
COPY nginx.conf /etc/nginx/nginx.conf

# Create a basic health check endpoint
RUN echo "OK" > /usr/share/nginx/html/health

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/health || exit 1

# Start nginx (default command)
CMD ["nginx", "-g", "daemon off;"]