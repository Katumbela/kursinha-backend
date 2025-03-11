# Kursinha Financial API Documentation

This document provides examples and instructions for using the Financial API endpoints in the Kursinha platform.

> **Note:** All endpoints require authentication. Make sure to include the JWT token in the Authorization header:
> `Authorization: Bearer your-jwt-token`

## 1. Get User Earnings

Retrieves a user's earnings information.

**Endpoint:** `GET /financial/earnings/:userId`

**Parameters:**
- `userId` - The ID of the user

**Example Request:**
```
GET /financial/earnings/60d21b4667d0d8992e610c85
```

**Example Response:**
```json
{
  "grossEarnings": 5000,
  "netEarnings": 4500,
  "salesCount": 10
}
```

**Notes:**
- `grossEarnings` is the total revenue before fees and commissions
- `netEarnings` is the revenue after deducting platform fees and affiliate commissions
- `salesCount` is the total number of completed sales

## 2. Get Available Balance

Retrieves a user's available balance for withdrawals.

**Endpoint:** `GET /financial/balance/:userId`

**Parameters:**
- `userId` - The ID of the user

**Example Request:**
```
GET /financial/balance/60d21b4667d0d8992e610c85
```

**Example Response:**
```json
{
  "availableBalance": 3500,
  "totalWithdrawn": 1000,
  "pendingWithdrawals": 500
}
```

**Notes:**
- `availableBalance` is the amount available for withdrawal
- `totalWithdrawn` is the sum of all processed withdrawals
- `pendingWithdrawals` is the sum of all pending withdrawal requests

## 3. Get Withdrawal History

Retrieves a user's withdrawal history.

**Endpoint:** `GET /financial/withdrawals/:userId`

**Parameters:**
- `userId` - The ID of the user

**Example Request:**
```
GET /financial/withdrawals/60d21b4667d0d8992e610c85
```

**Example Response:**
```json
[
  {
    "id": "60d21b4667d0d8992e610c99",
    "amount": 500,
    "status": "PROCESSED",
    "clientId": "60d21b4667d0d8992e610c85",
    "createdAt": "2023-06-01T15:30:00.000Z",
    "processedAt": "2023-06-02T10:15:00.000Z",
    "fees": 12.5
  },
  {
    "id": "60d21b4667d0d8992e610c98",
    "amount": 500,
    "status": "PENDING",
    "clientId": "60d21b4667d0d8992e610c85",
    "createdAt": "2023-06-05T09:45:00.000Z",
    "fees": 12.5
  }
]
```

## 4. Get Bank Transfer History

Retrieves a user's bank transfer history.

**Endpoint:** `GET /financial/transfers/:userId`

**Parameters:**
- `userId` - The ID of the user

**Example Request:**
```
GET /financial/transfers/60d21b4667d0d8992e610c85
```

**Example Response:**
```json
[
  {
    "id": "60d21b4667d0d8992e610c99",
    "amount": 500,
    "status": "PROCESSED",
    "clientId": "60d21b4667d0d8992e610c85",
    "createdAt": "2023-06-01T15:30:00.000Z",
    "processedAt": "2023-06-02T10:15:00.000Z",
    "fees": 12.5
  }
]
```

## 5. Register Bank Account

Registers a new bank account for a user.

**Endpoint:** `POST /financial/bank-account`

**Request Body:**
```json
{
  "clientId": "60d21b4667d0d8992e610c85",
  "bankName": "Banco do Brasil",
  "accountName": "John Doe",
  "accountNumber": "12345-6",
  "accountType": "Savings",
  "default": true
}
```

**Example Response:**
```json
{
  "success": true,
  "message": "Bank account registered successfully",
  "bankAccount": {
    "bankName": "Banco do Brasil",
    "accountName": "John Doe",
    "accountNumber": "12345-6",
    "accountType": "Savings",
    "default": true,
    "createdAt": "2023-06-10T14:30:00.000Z"
  }
}
```

**Notes:**
- Setting `default: true` will make this the default account for withdrawals
- Only one bank account can be set as default

## 6. Get User Bank Accounts

Retrieves all bank accounts registered for a user.

**Endpoint:** `GET /financial/bank-accounts/:userId`

**Parameters:**
- `userId` - The ID of the user

**Example Request:**
```
GET /financial/bank-accounts/60d21b4667d0d8992e610c85
```

**Example Response:**
```json
[
  {
    "bankName": "Banco do Brasil",
    "accountName": "John Doe",
    "accountNumber": "12345-6",
    "accountType": "Savings",
    "default": true,
    "createdAt": "2023-06-10T14:30:00.000Z"
  },
  {
    "bankName": "Nubank",
    "accountName": "John Doe",
    "accountNumber": "7890-1",
    "accountType": "Current",
    "default": false,
    "createdAt": "2023-06-12T09:15:00.000Z"
  }
]
```

## 7. Request Bank Transfer

Creates a withdrawal request to transfer money to a bank account.

**Endpoint:** `POST /financial/request-transfer`

**Request Body:**
```json
{
  "producerId": "60d21b4667d0d8992e610c85",
  "amount": 500,
  "bankAccountId": "60d21b4667d0d8992e610c95",
  "description": "Monthly withdrawal"
}
```

**Example Response:**
```json
{
  "id": "60d21b4667d0d8992e610c99",
  "amount": 500,
  "status": "PENDING",
  "createdAt": "2023-06-15T10:30:00.000Z",
  "fees": 12.5,
  "netAmount": 487.5,
  "message": "Transfer request submitted successfully"
}
```

**Notes:**
- The system automatically applies a 2.5% fee on withdrawals
- `netAmount` represents the amount after fees
- Transfers are processed within 1-2 business days
- Minimum withdrawal amount is 100
- Insufficient balance will result in a 400 Bad Request error
