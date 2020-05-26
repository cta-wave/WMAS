# `events` - [Sessions API](../README.md#sessions-api)

Session events can be used to send messages related to a specific session for 
others to receive. This can include status updates or action that running 
session react on.

For possible events see [Session Event Types](./event-types.md)

## 1. `listen events`

Listen for session specific events by registering on the `events` endpoint using HTTP long polling.

### HTTP Request

```
GET /api/sessions/<token>/events
```

#### Response Payload

```json
{
  "type": "String",
  "data": "String"
}
```

- **type**: the type of event that occurred.
- **data**: the actual payload of the event

#### Example

```
GET /api/sessions/6fdbd1a0-c339-11e9-b775-6d49dd567772/events
```

```json
{
  "type": "status",
  "data": "paused"
}
```

## 2. `push events`

Push session specific events for any registered listeners to receive.

### HTTP Request

```
POST /api/sessions/<token>/events
```

```json
{
  "type": "String",
  "data": "String"
}
```

- **type**: the type of event that occurred.
- **data**: the actual payload of the event

#### Example

```
POST /api/sessions/6fdbd1a0-c339-11e9-b775-6d49dd567772/events
```

```json
{
  "type": "status",
  "data": "paused"
}
```
