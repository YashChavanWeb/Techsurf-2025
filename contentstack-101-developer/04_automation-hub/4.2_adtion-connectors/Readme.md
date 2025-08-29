## Sub Automation Action

A **Sub Automation** allows you to break down larger automation tasks into smaller, manageable steps. This makes it easier to design, implement, and maintain automation workflows. The **Sub Automation Action** connector enables you to fetch and execute sub automations as part of a larger workflow, particularly useful when working with actions like **ChatGPT Function Calling**.

### Setting up the Sub Automation Action

1. **Configure Action:**

   - Click **Configure Action** in the left navigation panel.
   - Select the **Sub Automation** connector.
   - Under **Choose an Action**, select the **Sub Automation** action.
   - From the dropdown, choose the sub automation you want to use. Only **Live Sub Automations** will be available.
   - Complete the **Sub Automation Template** with the required values.

2. **Test & Save:**

   - Click **Proceed** to continue.
   - Test the action using **Test Action**.
   - Click **Save and Exit** to save your configuration.

### Example Use Case: Translate Content and Create New Entry

In this use case, when a new entry is created in Contentstack, the automation will:

1. Translate the entry into German.
2. Create a new entry for the translated content.
