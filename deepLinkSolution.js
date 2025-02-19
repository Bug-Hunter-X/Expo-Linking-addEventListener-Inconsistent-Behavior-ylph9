To fix this issue, use a combination of `Linking.getInitialURL` and `Linking.addEventListener`.  `Linking.getInitialURL` retrieves the initial URL on app launch, handling cases where the app was opened via a deep link. `Linking.addEventListener` continues to listen for deep links while the app is running.  Ensure you clean up the event listener when the component unmounts to avoid memory leaks.

```javascript
import * as Linking from 'expo-linking';
import React, { useEffect, useState } from 'react';

function MyComponent() {
  const [initialUrl, setInitialUrl] = useState(null);

  useEffect(() => {
    const getInitialUrl = async () => {
      const url = await Linking.getInitialURL();
      setInitialUrl(url);
    };
    getInitialUrl();

    const subscription = Linking.addEventListener('url', (event) => {
      console.log('URL received:', event.url);
      // Handle the URL here
    });

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (initialUrl) {
      console.log('Initial URL:', initialUrl);
      // Handle the initial URL here
    }
  }, [initialUrl]);

  return (
    //Your component
  );
}
export default MyComponent;
```