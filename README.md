## DOCKER STEPS

STEP 0: CLONE REPO git clone https://github.com/SaumilBisht/Paytm-TurboRepo  cd Paytm-TurboRepo 

STEP 1: CREATE NETWORK docker network create my_app

STEP 2: RUN POSTGRES 
      -> docker run -d --name my_postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 postgres
      
STEP 3: BUILD IMAGES
        -> docker build -t my-frontend -f docker/Dockerfile.user .
        -> docker build -t my-webhook -f docker/Dockerfile.webhook .
        -> docker build -t my-axis -f docker/Dockerfile.axis .
        -> docker build -t my-hdfc -f docker/Dockerfile.hdfc .



STEP 4: RUN EACH CONTAINER

    1. user app
      -
    2. webhook
      -
    3. axis Bank
      -
    4. hdfc Bank 
      - 