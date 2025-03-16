Folders can be in one of three states: locked, ask for approval, or editable.

### Folder Locking States

1. **Locked**: 
   - When a folder is locked, no changes can be made to its contents. This ensures that the files within the folder remain stable and unaltered. 
   - Locked folders are typically used for components that are critical to the application and should not be modified without thorough review and testing.

2. **Ask for Approval**: 
   - Folders in this state require approval before any changes can be made. 
   - This is useful for collaborative environments where multiple team members need to review and approve changes to ensure quality and consistency. 
   - A request for approval can be sent to designated reviewers who will then approve or reject the changes.

3. **Editable**: 
   - Editable folders allow unrestricted changes. 
   - This state is used for active development where files are frequently modified and updated. 
   - Once the development is complete and the feature is stable, the folder can be transitioned to the "ask for approval" or "locked" state.

### Implementation of Folder Locking

After a feature is stable and accepted, the supporting components get .ailock files to indicate their state.

- **.ailock File**: 
  - Each folder can contain a `.ailock` file that specifies its current state (locked, unlocked, ask for approval).
  - The `.ailock` file is a simple text file with one of the following values: `locked`, `unlocked`, `ask`.

Example: