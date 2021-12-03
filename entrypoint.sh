#entrypoint.sh

#/bin/bash
# Docker entrypoint script.

# Create, migrate, and seed database if it doesn't exist.

yarn start
