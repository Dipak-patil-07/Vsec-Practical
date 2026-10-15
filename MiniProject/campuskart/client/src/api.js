export async function sendRequest(url, method, body) {
  const options = {
    method: method,
    headers: { "Content-Type": "application/json" },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);
  const data = await response.json();

  return { ok: response.ok, data: data };
}
