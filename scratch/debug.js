async function x() {
  const r = await fetch("http://localhost:3000/api/hero-settings", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({lang: "en", title: "Testing API locally"})
  });
  console.log(await r.json());
}
x();
