const button = document.getElementById("myButton");

if (button) {
  button.addEventListener("click", async () => {
    // alert("Button clicked!");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const response = await fetch("http://localhost:3000/post", {
      method: "POST",
      body: JSON.stringify({ username: "example" }),
      headers: myHeaders,
    });
    if (!response.ok) {
      throw new Error(`レスポンスステータス: ${response.status}`);
    }
    console.log(await response.json());
  });
}
