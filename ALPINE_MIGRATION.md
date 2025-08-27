# Alpine Linux Migration Plan

## Overview

This document outlines the migration plan from end-of-life (EOL) Alpine Linux versions to the latest supported version (Alpine 3.22.1) across the Peddle infrastructure.

## Current State

The following containers are currently using EOL Alpine Linux versions:

| Container Repository | Current Alpine Version | EOL Status |
|---------------------|------------------------|------------|
| Marketing-frontend | ALPINE_LINUX_3_16 | EOL |
| publisher-embedded-frontend | ALPINE_LINUX_3_14 | EOL |
| facebook-graph-proxy | ALPINE_LINUX_3_14 | EOL |
| pdf-service | ALPINE_LINUX_3_18 | EOL |
| seller-frontend | ALPINE_LINUX_3_18 | EOL |

## Target State

All containers will be migrated to **Alpine Linux 3.22.1**, which is the latest stable version with long-term support.

## Migration Benefits

- **Security**: Latest security patches and vulnerability fixes
- **Performance**: Improved performance and optimizations
- **Support**: Active community and vendor support
- **Compliance**: Meets security compliance requirements

## Implementation Plan

### Phase 1: publisher-embedded-frontend (This Repository)
✅ **Status**: Complete

- [x] Created Dockerfile with Alpine 3.22.1
- [x] Added nginx configuration for serving examples
- [x] Added docker-compose.yml for local development
- [x] Added health checks and security headers
- [x] Maintained backward compatibility

### Phase 2: Other Services (External Repositories)

The following services need to be updated in their respective repositories:

#### Marketing-frontend
- **Current**: Alpine 3.16 (EOL)
- **Target**: Alpine 3.22.1
- **Action Required**: Update Dockerfile FROM instruction
- **Testing**: Verify frontend functionality and build process

#### facebook-graph-proxy
- **Current**: Alpine 3.14 (EOL)
- **Target**: Alpine 3.22.1
- **Action Required**: Update Dockerfile and test API endpoints
- **Special Considerations**: Verify Facebook Graph API compatibility

#### pdf-service
- **Current**: Alpine 3.18 (EOL)
- **Target**: Alpine 3.22.1
- **Action Required**: Update Dockerfile and test PDF generation
- **Special Considerations**: Verify PDF libraries compatibility

#### seller-frontend
- **Current**: Alpine 3.18 (EOL)
- **Target**: Alpine 3.22.1
- **Action Required**: Update Dockerfile and test frontend functionality
- **Special Considerations**: Verify seller-specific features

## Testing Strategy

### For Each Service:

1. **Build Testing**
   ```bash
   docker build -t service-name:alpine-3.22.1 .
   ```

2. **Functionality Testing**
   - Start container with new Alpine version
   - Run health checks
   - Test core functionality
   - Verify API endpoints (where applicable)

3. **Integration Testing**
   - Test service interactions
   - Verify network connectivity
   - Check data persistence

4. **Performance Testing**
   - Compare response times
   - Monitor resource usage
   - Load testing where applicable

## Rollout Plan

### Pre-Migration Checklist
- [ ] Backup current container images
- [ ] Document current configuration
- [ ] Prepare rollback plan
- [ ] Schedule maintenance window

### Migration Steps
1. **Development Environment**
   - Update Dockerfiles in development branches
   - Test builds and functionality
   - Update CI/CD pipelines

2. **Staging Environment**
   - Deploy to staging
   - Run comprehensive tests
   - Performance validation

3. **Production Environment**
   - Blue-green deployment
   - Monitor metrics
   - Verify functionality
   - Complete migration

### Post-Migration
- [ ] Update documentation
- [ ] Monitor for issues
- [ ] Performance analysis
- [ ] Security scan results

## Docker Configuration Changes

### Standard Dockerfile Update Pattern

**Before (EOL versions):**
```dockerfile
FROM alpine:3.14  # or 3.16, 3.18
```

**After (Current version):**
```dockerfile
FROM alpine:3.22.1
```

### Additional Considerations

1. **Package Compatibility**
   - Some packages may have version changes
   - Update package installation commands if needed
   - Test application dependencies

2. **Security Enhancements**
   ```dockerfile
   # Add security best practices
   RUN addgroup -S appgroup && adduser -S appuser -G appgroup
   USER appuser
   ```

3. **Health Checks**
   ```dockerfile
   HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
     CMD wget --no-verbose --tries=1 --spider http://localhost/health || exit 1
   ```

## Monitoring and Validation

### Key Metrics to Monitor
- Container startup time
- Memory usage
- CPU utilization
- Application response times
- Error rates

### Validation Commands
```bash
# Check Alpine version
docker run --rm image-name cat /etc/alpine-release

# Verify security updates
docker run --rm image-name apk audit

# Test health endpoint
curl -f http://container-url/health
```

## Rollback Plan

If issues are discovered post-migration:

1. **Immediate Rollback**
   ```bash
   docker tag service-name:backup service-name:latest
   docker service update --image service-name:latest service-name
   ```

2. **Investigation**
   - Collect logs and metrics
   - Identify root cause
   - Plan remediation

3. **Re-migration**
   - Fix identified issues
   - Re-test in staging
   - Deploy with enhanced monitoring

## Timeline

| Phase | Duration | Target Date |
|-------|----------|-------------|
| Phase 1: publisher-embedded-frontend | 1 day | Complete |
| Phase 2: Other services planning | 2 days | TBD |
| Phase 2: Development & Testing | 1 week | TBD |
| Phase 2: Staging Deployment | 2 days | TBD |
| Phase 2: Production Migration | 1 day | TBD |

## Success Criteria

- [ ] All containers running Alpine 3.22.1
- [ ] No functionality regression
- [ ] Improved security posture
- [ ] Maintained performance levels
- [ ] Updated documentation

## Contact Information

For questions or issues regarding this migration:
- **Security Team**: cybersecurity@peddle.com
- **Infrastructure Team**: [Add contact]
- **Emergency Contact**: [Add contact]

---

**Note**: This migration addresses critical security vulnerabilities in EOL Alpine Linux versions. Prioritize completion to maintain security compliance.