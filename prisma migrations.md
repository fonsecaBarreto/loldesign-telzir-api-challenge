    
# Rode o serviço prisma migrate em docker-compose

$ docker-compose up -d prisma-migrate

migrate dev command:
    - docker exec -it telzir-prisma-migrate prisma migrate dev
  
deploy command:
    - docker exec -it telzir-prisma-migrate prisma migrate deploy

seed command: 
    - docker exec -it telzir-prisma-migrate {{ seed script }}
