# DigitalOcean Deployment Guide

## Quick Deploy

### Option 1: DigitalOcean Console
1. Go to [DigitalOcean App Platform](https://cloud.digitalocean.com/apps)
2. Click "Create App"
3. Select "GitHub" as source
4. Choose repository: `stampedehosting/30-Days-to-a-High-Trust-Life-`
5. Select branch: `main`
6. DigitalOcean will auto-detect Next.js and use the `.do/app.yaml` config
7. Review settings and click "Create Resources"

### Option 2: doctl CLI
```bash
# Install doctl if not already installed
# brew install doctl  # macOS
# snap install doctl  # Linux

# Authenticate
doctl auth init

# Create app from spec
doctl apps create --spec next-app/.do/app.yaml

# Check status
doctl apps list
```

## Configuration

### App Spec (`.do/app.yaml`)
- **Source Directory:** `/next-app`
- **Build Command:** `npm run build`
- **Run Command:** `npm start`
- **Port:** 3000
- **Instance:** basic-xxs (can be scaled up)

### Environment Variables
Set in DigitalOcean console or via `app.yaml`:
- `NODE_ENV=production` (already configured)

### Custom Domain
After deployment:
1. Go to app settings > Domains
2. Add your custom domain
3. Update DNS records as instructed

## Build Configuration

The app is configured with:
- **Output:** Standalone (optimized for deployment)
- **Compression:** Enabled
- **Image Optimization:** AVIF/WebP formats
- **Asset Caching:** 1 year for static assets

## Post-Deployment

### Health Check
After deployment, verify:
```bash
curl https://your-app-name.ondigitalocean.app/
```

### Monitor Logs
```bash
doctl apps logs <app-id> --type run
doctl apps logs <app-id> --type build
```

### Update Deployment
```bash
# Automatic on push to branch
git push origin main

# Or trigger manually
doctl apps create-deployment <app-id>
```

## Scaling

To scale the instance:
1. Go to app settings > Resources
2. Change instance size (basic-xxs → basic-xs → basic-s, etc.)
3. Or increase instance count for horizontal scaling

## Troubleshooting

### Build Fails
- Check build logs: `doctl apps logs <app-id> --type build`
- Verify `package.json` has correct dependencies
- Ensure Next.js version compatibility

### Runtime Issues
- Check runtime logs: `doctl apps logs <app-id> --type run`
- Verify environment variables are set correctly
- Check that port 3000 is configured

### Asset Loading Issues
- Verify `/assets/` files are in `public/assets/`
- Check browser console for 404s
- Verify cache headers in Network tab

## Cost Estimation

**basic-xxs instance:**
- $5/month
- 512 MB RAM
- 1 vCPU
- Suitable for low-traffic sites

**Recommended for production:**
- basic-xs: $12/month (1GB RAM)
- basic-s: $24/month (2GB RAM)

## Support

- [DigitalOcean App Platform Docs](https://docs.digitalocean.com/products/app-platform/)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
