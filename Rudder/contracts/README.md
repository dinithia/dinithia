# Contracts

Cross-cutting interface definitions shared by producers and consumers.

| Directory | Purpose |
|-----------|---------|
| `openapi/` | HTTP API specifications |
| `openapi/platform/` | Authentication, authorization, and user-management APIs |
| `protobuf/` | gRPC / protobuf schemas |
| `events/` | Event and message contracts |

Implementations live in deployables or packages; this tree is the source of truth for interfaces.
