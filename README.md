## DOCKER STEPS

STEP 0: CLONE REPO git clone https://github.com/SaumilBisht/Paytm-TurboRepo  cd Paytm-TurboRepo 

STEP 1: CREATE NETWORK docker network create my_app

STEP 2: BUILD IMAGES
        -> docker build -t my-frontend -f docker/Dockerfile.user .
        -> 