# Layer-wise Architecture

**Diagram:**
![alt text](images/image.jpeg)

To create a simple website using Contentstack as its CMS, your architecture can be broken down into the following four layers, with each layer serving a different purpose:

---

### 1. **Deployment and Infrastructure Layer**

- Hosts your application (e.g., Amazon S3, etc.)

---

### 2. **Microservices Layer**

- Content translation services (for multilingual websites)
- E-commerce and cart services – Shopify
- Search functionality – Elastic Search
- Digital Asset Management – Cloudinary

---

### 3. **Frontend or Presentation Layer**

- The presentation layer fetches content from Contentstack using Content Delivery APIs and renders it the way you want.

---

### 4. **Frontend CDN Layer**

- Helps render content to your client quickly and without any lag.
- CDN services store caches of content in data centers around the world. All subsequent page requests are served from the nearest cache data center.
- You can define your custom cache purge policy based on how often you want to clear out the cache and make way for new (fresh or updated) content.

---

# MACH Architecture

**Diagram:**
![alt text](images/image-1.png)

- The AWS Lambda in the architecture diagram represents the **“microservice”** component of MACH.
- The communication between the systems happens through the **APIs** (REST or GraphQL). The arrows in the diagram represent this communication and form the **“API-first”** component.

---
