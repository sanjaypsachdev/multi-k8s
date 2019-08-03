docker build -t sanjaypsachdev/multi-client:latest -t sanjaypsachdev/multi-client:$SHA -f ./client/Dockerfile ./client
docker build -t sanjaypsachdev/multi-server:latest -t sanjaypsachdev/multi-server:$SHA  -f ./server/Dockerfile ./server
docker build -t sanjaypsachdev/multi-worker:latest -t sanjaypsachdev/multi-worker:$SHA  -f ./worker/Dockerfile ./worker

docker push sanjaypsachdev/multi-client:latest
docker push sanjaypsachdev/multi-server:latest
docker push sanjaypsachdev/multi-worker:latest

docker push sanjaypsachdev/multi-client:$SHA
docker push sanjaypsachdev/multi-server:$SHA
docker push sanjaypsachdev/multi-worker:$SHA

kubectl apply -f k8s
kubectl set image deployments/client-deployment server=sanjaypsachdev/multi-client:$SHA
kubectl set image deployments/server-deployment server=sanjaypsachdev/multi-server:$SHA
kubectl set image deployments/worker-deployment server=sanjaypsachdev/multi-worker:$SHA