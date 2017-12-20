# Queue Requests

This is a small library intended to rate limit number of simultaneous requests. For example, it is generally advised to have 6–8 AJAX requests in parallel in the browser, and sometimes it can degrade user experience. This library solves exactly this problem:

```js
import createQueue from 'queue-requests';

// 6 parallel requests
const queue = createQueue(6);

export function get(url, params) {
  return queue(function() {
    return fetch(url, {
      method: 'GET',
      ...
    });
  });
}
```

Queue won't process new requests until old ones won't be resolved.

You can instantiate queue only with 1 request in parallel – so, they will be executed one by one!

# License

MIT
