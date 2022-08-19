    
# Rode o serviço prisma migrate em docker-compose

$ docker-compose up -d prisma-migrate

deploy command:
    - docker exec -it telzir-prisma-migrate prisma migrate deploy

migrate dev command:
    - docker exec -it telzir-prisma-migrate prisma migrate dev

seed deploy command: 
    - docker exec -it telzir-prisma-migrate {{ seed script }}
