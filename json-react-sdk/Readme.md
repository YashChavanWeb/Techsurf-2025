# JSON React SDK

A React SDK that lets you fetch and display data dynamically from APIs like JSONPlaceholder.

## Installation

```bash
npm install json-react-sdk
```

## Usage

```jsx
import JsonSdk from "json-react-sdk";

function App() {
  return (
    <div>
      <JsonSdk /> {/* Interactive Mode */}
      <JsonSdk dataType="users" /> {/* All users */}
      <JsonSdk dataType="users" id={1} /> {/* Single user */}
      <JsonSdk dataType="users" id={1} fields={["id", "name", "email"]} />
    </div>
  );
}
```

## Props

- `dataType` → (string) `users`, `posts`, `photos`
- `id` → (number) Optional ID
- `fields` → (array or string) Fields to return
