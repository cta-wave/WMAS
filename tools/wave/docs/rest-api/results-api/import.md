# Import results - [Results API](../README.md#results-api)

If enabled, the WMAS Test Runner can import results exported by any arbitrary other instance.

## HTTP Request

```
POST /api/results/import
```

### HTTP Response

If successful, the server responds with the token of the imported session:

```json
{
  "token": "String"
}
```

However, if an error occured, the server responds the error message:

```json
{
  "error": "String"
}
```
