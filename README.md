# Color Pickers - Modern Color Tools & Converters

Color Pickers (https://color-pickers.com) is a production-ready, ultra-fast color suite inspired by tools like Color-Hex, re-imagined with modern design principles, Next.js App Router, TypeScript, and client-side zero-latency processing.

## Key Features

- **HEX, RGB, HSL, HSV, CMYK Conversions**: Real-time conversions with sub-millisecond execution.
- **Dynamic Color Pages**: SEO-friendly dynamic routes `/hex/[code]` with shades, tints, tones, harmonies, and developer export formats.
- **Multi-stop Gradient Generator**: Linear, radial, and conic gradients with CSS & Tailwind export.
- **5-Color Palette Generator**: Spacebar generation, color locking, harmonies, and shareable URLs.
- **Eyedropper & Color Picker**: Direct screen color sampling and fine-tuning sliders.
- **WCAG Contrast Calculator**: Relative luminance and WCAG AA/AAA compliance verifications.
- **AdSense Ready**: Non-intrusive reserved ad slots that never shift layout.
- **Dark & Light Mode**: Seamless theme switching with local storage persistence.
- **SEO Ready**: JSON-LD schema, breadcrumbs, canonical metadata, sitemap.xml, and robots.txt.

---

## Getting Started Locally

### Prerequisites

- Node.js 18.x or 20.x
- npm / pnpm / yarn

### Installation

1. Clone the repository or extract source code:
   ```bash
   git clone https://github.com/your-username/chromacraft.git
   cd chromacraft
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Production Build

To test the production build locally:

```bash
# Build the application
npm run build

# Start the production server
npm run start
```

---

## Deployment on a Self-Hosted VPS

### Option 1: PM2 + Nginx (Recommended)

1. **SSH into your VPS**:
   ```bash
   ssh user@your-vps-ip
   ```

2. **Install Node.js & PM2**:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   sudo npm install -g pm2
   ```

3. **Deploy Application**:
   ```bash
   git clone <repo-url> /var/www/chromacraft
   cd /var/www/chromacraft
   npm install
   npm run build
   ```

4. **Start Application with PM2**:
   ```bash
   pm2 start npm --name "chromacraft" -- start
   pm2 save
   pm2 startup
   ```

5. **Configure Nginx Reverse Proxy** (`/etc/nginx/sites-available/chromacraft`):
   ```nginx
   server {
       listen 80;
       server_name chromacraft.app www.chromacraft.app;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

6. **Enable Site & SSL (Certbot)**:
   ```bash
   sudo ln -s /etc/nginx/sites-available/chromacraft /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   sudo certbot --nginx -d chromacraft.app -d www.chromacraft.app
   ```

---

## Project Structure

```
├── app/
│   ├── about/              # About page
│   ├── contact/            # Contact form
│   ├── globals.css         # Global Tailwind styles
│   ├── hex/[code]/         # Dynamic HEX color detail page
│   ├── layout.tsx          # Root layout & providers
│   ├── page.tsx            # Home page
│   ├── privacy-policy/     # Privacy Policy (AdSense compliant)
│   ├── terms/              # Terms of Service
│   ├── tools/              # Tools directory & tool pages
│   │   ├── color-picker/   # Eyedropper & picker tool
│   │   ├── converter/      # All-in-one converter tool
│   │   ├── gradient-generator/
│   │   ├── hex-to-cmyk/
│   │   ├── hex-to-hsl/
│   │   ├── hex-to-hsv/
│   │   ├── hex-to-rgb/
│   │   ├── palette-generator/
│   │   └── random-color/
│   ├── robots.ts           # Dynamic robots.txt
│   └── sitemap.ts          # Dynamic sitemap.xml
├── components/             # Reusable UI components
├── lib/                    # Color math engine, names, presets
└── metadata.json           # Application metadata
```

License: MIT
