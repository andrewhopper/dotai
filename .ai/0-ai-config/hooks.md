# Development Workflow Hooks

## Pre-Code Commit Validation
1. **Environment Checks**
   - Verify Node.js v18.x is active
   - Confirm Docker daemon is running
   - Check database connection health

2. **Ticket System Integration**
   - Validate Jira ticket status = "In Development"
   - Enforce branch naming convention: `feature/[JIRA-ID]-short-desc`
   - Start time tracking entry in Harvest

3. **Code Quality Gates**
   - Run ESLint with strict mode
   - Verify 90% test coverage threshold
   - Check for secrets in changed files

## Post-Code Commit Automation
1. **CI/CD Pipeline**
   ```bash
   # Parallel test execution
   npm run test:ci -- --shard=3/3
   # Build and push Docker image
   docker buildx build --platform linux/amd64 -t registry.example.com/app:$COMMIT_SHA .
   ```

2. **Ticket Management**
   - Transition Jira ticket to "In Review"
   - Post PR link to Asana task comments
   - Update Slack deployment channel with build status

3. **Monitoring & Observability
   - Record deployment metrics in Datadog:
     ```json
     {
       "event": "Deployment",
       "sha": "$COMMIT_SHA",
       "environment": "staging",
       "timestamp": "$(date -u +'%Y-%m-%dT%H:%M:%SZ')"
     }
     ```
   - Create feature flag in LaunchDarkly
   - Initialize Splunk monitoring dashboard

## Post-Mortem Automation
1. **Cleanup Operations**
   - Archive old Docker images > 30 days
   - Rotate temporary credentials
   - Remove feature flags after 7 days

2. **Documentation**
   - Update API docs with `swagger-jsdoc`
   - Generate architecture diagram from code
   - Post retrospective template to Confluence
