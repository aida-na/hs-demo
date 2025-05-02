
 
# Setup Instructions

## for the client app (nextJS)
On mac, use Homebrew to install nextJS. 
- cd client_app
- npm install (installs dependencies)
- npm run dev (runs locally)
- By default, page will be live on localhost:3000. 
- Don't forget to setup your OpenAPI key in .env in the client_app folder

## for the journey backend service (fastAPI)
- ensure you have virtual env installed (if not, pip install virtualenv or pip3 install virtualenv)
- virtualenv venv 
- source venv/bin/activate (for mac only; different for Linux/Windows)
- pip install -r requirements.txt (check you're in the right folder)
- by defalt, fastAPI will be running on 127.0.0.1:8000. 
- Don't forget to setup your resend key in .env in the client_app folder; the sending domain has to be DNS authenticated with MX records setup correctly with Resend


# RG Client App Prototype

This is a nextJS/React prototype of the complete client portal for us to test and prototype different ideas and approaches.

For now, all metrics and settings are read from configuration files; These will need to be connected to postgres/mysql via the backend APIs.

## Detailed Tabs/Features

### 1. Health Data Engine (HDE)
- Key metrics representing operational efficiency based on the list that the DS team shared 3/25
- The metrics are read from a configuration file metrics.ts; in the real-life version these should be updated to the backend-APIs or mysql/postgres/other

### 2. Population Explorer
- Visualizes metrics about the gold-member-tables. The metrics and charts are based on the member data table format shared by the DS team in 3/25
- The summary metrics, as well as population insights are read from population.ts

### 3. Content Creator
- The content editor is saves/writes the content file as Markdown; the preview screen is supposed
- The Guidelines are brand and clinical guidelines; they're currenly read from a config file; for a production implementation they should stored elsewhere
- OpenAI prompt is also stored in the config file; the default prompt is combined with the smart cohorts description + brand guidelines + clinical guidelines before sending a request to OpenAI
- Content files are saved and loaded as Markdown files. Eventually we should find a way to write these into S3? is there a better solution?

### 4. Journey Builder
- This is the visual journey mapping interface for both 
- Users can target the journeys either for a specific smart cohort; or for all members 
- The content avaiable is all listed with content creator
- There is a rudimentary drag and drop journey design

### 5. Smart Cohorts
- Placeholder - since this is already shipping in v1.1

### 6. Voice Agent Studio
- Placeholder - since this is already shipping in v1.1


## Auto-generated README
## Tech Stack
- **Framework**: Next.js 13 with App Router
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Charts**: Tremor
- **Maps**: react-simple-maps
- **Icons**: Lucide React
- **Database**: Supabase
- **Content**: Marked (Markdown parsing)
- **AI Integration**: OpenAI API

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd health-data-engine
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```env
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── (projects)/             # Main application routes
│   │   ├── content-creator/    # Content management system
│   │   ├── journey-builder/    # Campaign journey builder
│   │   ├── population-explorer/# Population analytics
│   │   ├── smart-cohorts/     # Cohort management
│   │   └── voice-agent/       # Voice interaction studio
│   ├── globals.css            # Global styles
│   └── layout.tsx             # Root layout
├── components/                 # Reusable components
│   ├── layout/                # Layout components
│   └── ui/                    # UI components
├── config/                    # Configuration files
├── lib/                       # Utility functions
│   └── config/               # Feature configurations
├── public/                    # Static assets
└── supabase/                 # Database migrations
```

## Configuration

### Content Guidelines
Content guidelines can be configured through the UI and are stored in local storage. They include:
- Brand guidelines
- Compliance requirements

### Smart Cohorts
Cohort definitions are managed in `config/content-assets.ts` and include:
- Type 2 Diabetes Members
- Pre-Diabetes Members
- Rural Markets
- Metformin Members

### Population Metrics
Population metrics and trends are configured in `lib/config/population.ts`, including:
- Demographics
- Health factors
- Geographic distribution
- Trend observations

### Adding New Features
1. Create a new route in the `app/(projects)` directory
2. Add necessary components in the `components` directory
3. Update the sidebar navigation in `components/layout/sidebar.tsx`
4. Add any required configuration in the `config` directory

### Styling
- Use Tailwind CSS for styling
- Follow the design system defined in `tailwind.config.ts`
- Use shadcn/ui components for consistent UI elements


## Deployment

The application is configured for static export using Next.js:

```bash
npm run build
```

The static output will be generated in the `out` directory.

## License

This project is proprietary and confidential. All rights reserved.
