# Problem 5: A Crude Server

Using Kubernetes to deploy the backend and database

## (Optional) Build your own Docker image

```
docker build -t jojonicho/node-ninetech-server .
docker push jojonicho/node-ninetech-server:latest

```

## Start the application

```
chmod +x ./startup.sh
./startup.sh
```

OR

```
kubectl apply -f db.yaml
kubectl apply -f server.yaml
kubectl port-forward service/ninetech-server-service 8080:80
```

## Cleanup

```
chmod +x ./cleanup.sh
./cleanup.sh

```

```
kubectl delete -f db.yaml
kubectl delete -f server.yaml

```
