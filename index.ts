export default function createQueue(number: number) {
  if (typeof number !== "number") {
    throw new Error("queue-requests: you should pass a number");
  }

  if (number < 1) {
    throw new Error("queue-requests: number should be at least 1");
  }

  let requestsNumber = 0;

  const queue = [];

  return fn => {
    if (requestsNumber < number) {
      requestsNumber++;
      const promise = fn();

      promise.then(() => {
        requestsNumber--;

        if (queue.length) {
          const newRequest = queue.shift();
          const delayedPromise = newRequest.fn();

          delayedPromise.then(newRequest.resolve).catch(newRequest.reject);
        }
      });

      return promise;
    } else {
      return new Promise((resolve, reject) => {
        queue.push({ fn, resolve, reject });
      });
    }
  };
}
