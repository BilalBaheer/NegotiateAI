#!/bin/bash

# Start NegotiateAI development environment
echo "Starting NegotiateAI development environment..."

# Start MongoDB (uncomment if you're using a local MongoDB instance)
# echo "Starting MongoDB..."
# mongod --fork --logpath /tmp/mongodb.log

# Start backend server
echo "Starting backend server..."
cd backend
npm run dev &
BACKEND_PID=$!

# Wait for backend to start
echo "Waiting for backend to initialize..."
sleep 5

# Start frontend
echo "Starting frontend..."
cd ../negotiation-coach
npm start &
FRONTEND_PID=$!

# Setup trap to kill processes on script exit
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT TERM EXIT

# Keep script running
echo "Development environment started!"
echo "Backend running at http://localhost:5001"
echo "Frontend running at http://localhost:3000"
echo "Press Ctrl+C to stop all services"
wait
