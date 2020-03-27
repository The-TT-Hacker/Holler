curl --header "Content-Type: application/json" \
     --request POST \
     --data '{"email":"example@gmail.com","password":"test123"}' \
     http://localhost:5000/auth/register