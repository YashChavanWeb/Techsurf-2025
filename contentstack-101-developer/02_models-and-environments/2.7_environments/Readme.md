## Environments

A **publishing environment** is a specific destination where your content is delivered when published, for example, a web address.

---

## Types of Environments Developers Use

- **Development**
  Test if everything is running fine.

- **Staging**
  Mirrors the production environment, giving you a chance to perform final checks.

- **Production**
  The live environment, where the content is actually accessible to users.

> **Note**: Roles can be defined to restrict who can publish content to an environment, ensuring only authorized users with the proper credentials can deploy content.

---

## Under the Hood Working

- Each environment will need a **delivery token**—a read-only, environment-specific token that allows you to fetch and publish content.
- **API key** is required to authenticate and authorize API calls.

---

### Using Server for Multi-Server Deployments

You can use **Webhooks** to deploy published content simultaneously across multiple servers within a single publishing environment.

> **Note**: Contentstack's **Automate** and **Webhooks** can automatically publish your content to social media platforms, simplifying content distribution.

Imagine your company runs a website on several servers in different regions, like the **US**, **Europe**, and **Asia**. When you publish new content in an environment:

- **Webhooks instantly alert all servers**
- Each server **fetches and deploys the content immediately**

This ensures **efficient** and **synchronized global updates**.

---
