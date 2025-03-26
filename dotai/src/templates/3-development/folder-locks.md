---
id: DEV-folder-locks-001
created: {{createdDate}}
---

# Folder Locking Strategy <!-- SPEC-001 -->

## Folder Locking States <!-- SPEC-002 -->

### 1. Locked
- When a folder is locked, no changes can be made to its contents
- Locked folders contain stable, critical components
- Requires thorough review and testing to modify

### 2. Ask for Approval
- Folders in this state require approval before changes
- Useful for collaborative environments with review requirements
- Requests for approval are managed through the defined process

### 3. Editable
- Editable folders allow unrestricted changes
- Used for active development and frequent updates
- Can transition to "ask for approval" or "locked" after stabilization

## Implementation <!-- IMPL-001 -->

Each folder can contain a `.ailock` file that specifies its current state:
- `locked`: No changes allowed
- `ask`: Requires approval for changes
- `unlocked`: Changes allowed without restrictions

## Current Locked Folders <!-- INFO-001 -->
[List of currently locked folders]

## Approval Process <!-- PROC-001 -->
[Description of the approval process for locked folders]