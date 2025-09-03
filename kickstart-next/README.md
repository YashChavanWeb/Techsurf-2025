# Getting Started with Contentstack Integration

Before running the application, ensure that you have a **Contentstack Stack** to connect to. Follow the steps below to set up the stack and configure your environment.

## 1. Install the Contentstack CLI

To begin, install the Contentstack CLI globally:

```bash
npm install -g @contentstack/cli
```

### First Time Using the CLI?

**Note**: Free Contentstack developer accounts are restricted to the EU region.

Set the region for your Contentstack CLI:

```bash
csdx config:set:region EU
```

## 2. Log in via the CLI

Authenticate with Contentstack using the CLI:

```bash
csdx auth:login
```

## 3. Retrieve Your Organization UID

In your **Contentstack Organization Dashboard**, find the `Org Admin` section and copy your **Organization ID** (e.g., `blt481c598b0d8352d9`).

## 4. Create a New Stack

Replace `<YOUR_ORG_ID>` with your actual Organization ID, and then run the following command to seed a new stack:

```bash
csdx cm:stacks:seed --repo "contentstack/kickstart-stack-seed" --org "<YOUR_ORG_ID>" -n "Kickstart Stack"
```

## 5. Generate a Delivery Token

Navigate to `Settings > Tokens` and create a new **Delivery Token** with the `preview` scope. Ensure you enable the option to "Create preview token."

## 6. Update the `.env` File

Once you have the **API Key**, **Delivery Token**, and **Preview Token**, update your `.env` file with the following values:

> You can find the necessary tokens under **Settings > Tokens > Your token** in the Contentstack dashboard.

```bash
NEXT_PUBLIC_CONTENTSTACK_API_KEY=<YOUR_API_KEY>
NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN=<YOUR_DELIVERY_TOKEN>
NEXT_PUBLIC_CONTENTSTACK_PREVIEW_TOKEN=<YOUR_PREVIEW_TOKEN>
NEXT_PUBLIC_CONTENTSTACK_REGION=EU
NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT=preview
NEXT_PUBLIC_CONTENTSTACK_PREVIEW=true
```

## 7. Enable Live Preview

- Go to **Settings > Live Preview**.
- Enable the feature and select the `Preview` environment from the dropdown.
- Click **Save** to apply the changes.

## 8. Install the Project Dependencies

Run the following command to install all required dependencies:

```bash
npm install
```

## 9. Run the Application

To start the app, execute the following command:

```bash
npm run dev
```

### 10. View the Application

- **In the Browser**: Navigate to `http://localhost:3000` to view your live page.
- **In the CMS**:

  - Go to **Entries** and select the available entry.
  - In the sidebar, click the **Live Preview** icon.
  - Alternatively, view your entry in the **Visual Builder**.

---

## Key Files and Code

### 1. `lib/contentstack.ts`

This file initializes the Contentstack SDK and provides helper functions to fetch data.

```tsx
import contentstack, { QueryOperation } from "@contentstack/delivery-sdk";

// Import utility functions to handle region and endpoint configuration
import {
  getContentstackEndpoints,
  getRegionForString,
} from "@timbenniks/contentstack-endpoints";
```

**Initialize the Stack:**

```tsx
// Get the region and its API endpoints using the utility functions
const region = getRegionForString(
  process.env.NEXT_PUBLIC_CONTENTSTACK_REGION as string
);
const endpoints = getContentstackEndpoints(region, true);

// Initialize the Contentstack stack with configuration
export const stack = contentstack.stack({
  apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY as string,
  deliveryToken: process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN as string,
  environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT as string,
  region: region
    ? region
    : (process.env.NEXT_PUBLIC_CONTENTSTACK_REGION as any),
  host:
    process.env.NEXT_PUBLIC_CONTENTSTACK_CONTENT_DELIVERY ||
    (endpoints && endpoints.contentDelivery),

  // Live preview configuration
  live_preview: {
    enable: process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW === "true",
    preview_token: process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_TOKEN,
    host:
      process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_HOST ||
      (endpoints && endpoints.preview),
  },
});
```

**Import for Live Preview Configuration:**

```tsx
import ContentstackLivePreview, {
  IStackSdk,
} from "@contentstack/live-preview-utils";
```

**Initialize Live Preview:**

```tsx
export function initLivePreview() {
  ContentstackLivePreview.init({
    ssr: false,
    enable: process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW === "true",
    mode: "builder",

    // Stack SDK configuration
    stackSdk: stack.config as IStackSdk,

    stackDetails: {
      apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY as string,
      environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT as string,
    },

    clientUrlParams: {
      host:
        process.env.NEXT_PUBLIC_CONTENTSTACK_CONTENT_APPLICATION ||
        (endpoints && endpoints.application),
    },
    editButton: {
      enable: true,
      exclude: ["outsideLivePreviewPortal"],
    },
  });
}
```

**Accessing the Page Entry:**

```tsx
export async function getPage(url: string) {
  const result = await stack
    .contentType("page") // Specify the content type
    .entry() // Access the entry
    .query() // Create a query
    .where("url", QueryOperation.EQUALS, url) // Filter by URL
    .find<Page>(); // Execute the query and return the result

  if (result.entries) {
    const entry = result.entries[0]; // Get the first entry from the result

    if (process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW === "true") {
      contentstack.Utils.addEditableTags(entry, "page", true);
    }

    return entry;
  }
}
```

### 2. `app/page.tsx`

This file contains the Home page component that fetches and displays data from Contentstack.

```tsx
import { getPage, initLivePreview } from "@/lib/contentstack"; // Get page data and initialize live preview
import { Page } from "@/lib/types";
import ContentstackLivePreview, {
  VB_EmptyBlockParentClass,
} from "@contentstack/live-preview-utils";
```

**State Setup for Page:**

```tsx
const [page, setPage] = useState<Page>();
```

**Fetching Page Data:**

```tsx
const getContent = async () => {
  const page = await getPage("/"); // You can change the URL here (e.g., "/page2")
  setPage(page);
};
```

**UseEffect Hook for Initial Setup:**

```tsx
useEffect(() => {
  initLivePreview();
  ContentstackLivePreview.onEntryChange(getContent);
}, []);
```

**Logging Page Data:**

```tsx
console.log(page?.title);
console.log(page?.description);
```

**Displaying the Image:**

```tsx
<Image
  className="mb-4"
  width={768}
  height={414}
  src={page?.image.url}
  alt={page?.image.title}
  {...(page?.image?.$ && page?.image?.$.url)}
/>
```

**Page Type Definition (`types.ts`):**

```tsx
export interface Page {
  uid: string;
  $: any;
  _version?: number;
  title: string;
  url?: string;
  description?: string;
  image?: File | null;
  rich_text?: string;
  blocks?: Blocks[];
}
```

---
