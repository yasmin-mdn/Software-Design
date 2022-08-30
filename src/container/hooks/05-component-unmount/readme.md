# 05 Component unmount

In this example we will create a simple test over a custom hook that it will unsubscribe an event when component will unmount.

We will start from `04-component-did-update`.

# Steps

- `npm install` to install previous sample packages:

```bash
npm install
```

- Let's create an `usePolling` custom hook:

### ./src/usePolling.ts

```javascript
import * as React from 'react';

export const usePolling = () => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    // Simulate calls to api and count it
    const interval = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return { count };
};
```

> NOTE: [useState functional updates](https://reactjs.org/docs/hooks-reference.html#functional-updates)

- Let's add some specs:

### ./src/usePolling.spec.ts

```javascript
import { renderHook } from '@testing-library/react-hooks';
import { usePolling } from './usePolling';

describe('usePolling specs', () => {
  it('', () => {
    // Arrange
    // Act
    // Assert
  });
});
```

- should return count equals 0 when initialize the hook:

### ./src/usePolling.spec.ts

```diff
import { renderHook } from '@testing-library/react-hooks';
import { usePolling } from './usePolling';

describe('usePolling specs', () => {
- it('', () => {
+ it('should return count equals 0 when initialize the hook', () => {
    // Arrange

    // Act
+   const { result } = renderHook(() => usePolling());

    // Assert
+   expect(result.current.count).toEqual(0);
  });
});

```

- should return count equals 1 when it waits for next update:

### ./src/usePolling.spec.ts

```diff
...
+ it('should return count equals 1 when it waits for next update', async () => {
+   // Arrange

+   // Act
+   const { result, waitForNextUpdate } = renderHook(() => usePolling());

+   await waitForNextUpdate();

+   // Assert
+   expect(result.current.count).toEqual(1);
+ });

```

- should return count equals 3 when it waits 3 times for next update:

### ./src/usePolling.spec.ts

```diff
...
+ it('should return count equals 3 when it waits 3 times for next update', async () => {
+   // Arrange

+   // Act
+   const { result, waitForNextUpdate } = renderHook(() => usePolling());

+   await waitForNextUpdate();
+   await waitForNextUpdate();
+   await waitForNextUpdate();

+   // Assert
+   expect(result.current.count).toEqual(3);
+ });

```

- Could we wait until value is three?:

### ./src/usePolling.spec.ts

```diff
...
  it('should return count equals 3 when it waits 3 times for next update', async () => {
    // Arrange

    // Act
-   const { result, waitForNextUpdate } = renderHook(() => usePolling());
+   const { result, waitForValueToChange } = renderHook(() => usePolling());

-   await waitForNextUpdate();
-   await waitForNextUpdate();
-   await waitForNextUpdate();
+   await waitForValueToChange(() => result.current.count === 3);

    // Assert
    expect(result.current.count).toEqual(3);
  });

```

- We can play with [wait options](https://react-hooks-testing-library.com/reference/api#wait-options) too:

### ./src/usePolling.spec.ts

```diff
...
  it('should return count equals 3 when it waits 3 times for next update', async () => {
    // Arrange

    // Act
    const { result, waitForValueToChange } = renderHook(() => usePolling());

-   await waitForValueToChange(() => result.current.count === 3);
+   await waitForValueToChange(() => result.current.count === 3, {
+     timeout: 3500,
+   });

    // Assert
    expect(result.current.count).toEqual(3);
  });

```

> NOTE: Try with `2000` ms

- should call clearInterval when it unmounts the component:

### ./src/usePolling.spec.ts

```diff
...
+ it('should call clearInterval when it unmounts the component', async () => {
+   // Arrange
+   const clearIntervalStub = jest.spyOn(window, 'clearInterval');

+   // Act
+   const { result, waitForNextUpdate, unmount } = renderHook(() =>
+     usePolling()
+   );

+   await waitForNextUpdate();

+   // Assert
+   expect(result.current.count).toEqual(1);
+   expect(clearIntervalStub).not.toHaveBeenCalled();

+   unmount();
+   expect(clearIntervalStub).toHaveBeenCalled();
+ });

```

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
