import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import ContentstackUIExtension from "@contentstack/ui-extensions-sdk";

// Importing CSS at the top to avoid issues
import '@contentstack/venus-components/build/main.css';

import { Button, Heading } from '@contentstack/venus-components';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Heading tagName="h2" text="Extension building using Venus component" />
      <Button
        buttonType="primary"
        onClick={() => {
          console.log('You clicked on Venus button');
        }}
      >
        Click on me
      </Button>
    </>
  );
}

export default App;
