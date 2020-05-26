# `configuration` - [General API](../README.md#general-api)

The `configuration` method is used to determine what features of different 
server APIs are enabled. 

## HTTP Request

```
GET /api/configuration
```

### Response

```json
{
  "import_results_enabled": "Boolean",
  "reports_enabled": "Boolean",
  "read_sessions_enabled": "Boolean"
}
```

- **import_results_enabled**: If true the [`import result`](../results-api/import.md) endpoint is available
- **reports_enabled**: If true the server will generate reports for completed APIs in a given test session.
- **read_sessions_enabled**: If true it is possible to list all sessions using the [`read sessions`](../sessions-api/read_sessions.md) endpoint of the sessions API

## Example

```
GET /api/results/config
```

```json
{
  "import_results_enabled": false,
  "reports_enabled": true,
  "read_sessions_enabled": false
}
```
