import jwt from 'jsonwebtoken'

export function verifyToken(request, response, next) {
  const token = request.headers['authorization'];
  
  if(!token) {
    return response.status(401).json({message: "Não autorizado"})
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode)=> {
    if(err){
      return response.status(500).json({message: "Erro no token!"})
    }
    
    next();
  })
}