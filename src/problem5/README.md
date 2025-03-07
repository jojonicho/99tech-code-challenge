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

# API Examples

## POST `/stocks/`

**Request:**

```json
{
  "ticker": "TSLA"
}
```

**Response:**

```json
{
  "ticker": "TSLA",
  "description": null,
  "id": "9f4f0de1-7444-4a5b-b6af-a2f8e95fb2e8",
  "currentPrice": "0.00",
  "createdAt": "2025-02-28T14:36:14.857Z",
  "updatedAt": "2025-02-28T14:36:14.857Z"
}
```

---

## PUT `/stocks/9f4f0de1-7444-4a5b-b6af-a2f8e95fb2e8`

**Request:**

```json
{
  "description": "do not buy"
}
```

**Response:**

```json
{
  "id": "9f4f0de1-7444-4a5b-b6af-a2f8e95fb2e8",
  "ticker": "TSLA",
  "description": "do not buy",
  "currentPrice": "0.00",
  "createdAt": "2025-02-28T14:36:14.857Z",
  "updatedAt": "2025-02-28T14:36:30.338Z"
}
```

---

## DELETE `/stocks/9f4f0de1-7444-4a5b-b6af-a2f8e95fb2e8`

**Request:**
No body required.

**Response:**
Status: `204 No Content`

---

## GET `/stocks/9f4f0de1-7444-4a5b-b6af-a2f8e95fb2e8`

**Request:**
No body required.

**Response:**

```json
{
  "id": "9f4f0de1-7444-4a5b-b6af-a2f8e95fb2e8",
  "ticker": "TSLA",
  "description": "do not buy",
  "currentPrice": "0.00",
  "createdAt": "2025-02-28T14:36:14.857Z",
  "updatedAt": "2025-02-28T14:36:30.338Z"
}
```

---

## GET `/stocks/`

**Request:**
No body required.

**Response:**

```json
[
  {
    "id": "9f4f0de1-7444-4a5b-b6af-a2f8e95fb2e8",
    "ticker": "TSLA",
    "description": "do not buy",
    "currentPrice": "0.00",
    "createdAt": "2025-02-28T14:36:14.857Z",
    "updatedAt": "2025-02-28T14:36:30.338Z"
  }
]
```
