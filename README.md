## DOCKER STEPS

STEP 0: CLONE REPO git clone https://github.com/SaumilBisht/Paytm-TurboRepo  cd Paytm-TurboRepo 

STEP 1: CREATE NETWORK docker network create my_app

STEP 2: RUN POSTGRES 
      -> docker run -d --name my_postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 postgres
      
STEP 3: BUILD IMAGES

        Firstly, in turbo.json, change pipeline to tasks as pipeline is for vercel and tasks for docker.

        -> docker build -t my-frontend -f docker/Dockerfile.user .
        -> docker build -t my-webhook -f docker/Dockerfile.webhook .
        -> docker build -t my-axis -f docker/Dockerfile.axis .
        -> docker build -t my-hdfc -f docker/Dockerfile.hdfc .



STEP 4: RUN EACH CONTAINER

    1. user app
      - docker run -d \   
        --name frontend \
        --network my_app \
        -e DATABASE_URL=postgresql://postgres:postgres@postgres:5432/postgres \
        -p 3000:3000 \
        my-frontend

    You also have to migrate the database.
    docker exec -it frontend sh
    cd packages/db
    npx prisma migrate dev --name init
    exit
    
    2. webhook
      - docker run -d \
        --name webhook \
        --network my_app \
        -e DATABASE_URL=postgresql://postgres:postgres@postgres:5432/postgres \
        -p 3003:3003 \
        my-webhook
    3. axis Bank
      - docker run -d \
        --name axis \   
        --network my_app \
        -e DATABASE_URL=postgresql://postgres:postgres@postgres:5432/postgres \
        -p 3004:3004 \
        my-axis 
    4. hdfc Bank 
      - docker run -d \
        --name hdfc \
        --network my_app \
        -e DATABASE_URL=postgresql://postgres:postgres@postgres:5432/postgres \
        -p 3005:3005 \
        my-hdfc


Stop all running containers:  ->docker stop $(docker ps -q)
Remove all containers: ->docker rm $(docker ps -aq)