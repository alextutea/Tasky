#!/usr/bin/env bash
echo "Creating mongo users..."
mongo admin --host localhost -u root -p ASDqwe123 --eval 'db.createCollection("users");'
echo "Mongo users created."
echo "Creating mongo tasks..."
mongo admin --host localhost -u root -p ASDqwe123 --eval 'db.createCollection("tasks");'
echo "Mongo tasks created."
echo "Creating mongo teams..."
mongo admin --host localhost -u root -p ASDqwe123 --eval 'db.createCollection("teams");'
echo "Mongo teams created."