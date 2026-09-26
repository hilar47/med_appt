$ curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane.doe@example.com",
    "password": "SecurePass123"
  }'

{"message":"Login successful","token":"mock-token-1-1790455843888","user":{"id":1,"role":"patient","name":"Jane Doe","email":"jane.doe@example.com","phone":"+971500000000"}}