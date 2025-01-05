const form = document.getElementById("comment-form");
const statusMessage = document.getElementById("status-message");

form.addEventListener("submit", async (event) => {
  event.preventDefault(); // 防止表單刷新頁面

  // 獲取輸入的值
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("All fields are required!");
    return;
  }

  try {
    // 發送 POST 請求到伺服器
    const response = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    const result = await response.json();

    if (response.ok) {
      // 成功提示
      statusMessage.style.color = "green";
      statusMessage.textContent = result.message;
      statusMessage.style.display = "block";

      // 清空表單
      form.reset();
    } else {
      // 錯誤提示
      statusMessage.style.color = "red";
      statusMessage.textContent = result.error || "Failed to submit comment.";
      statusMessage.style.display = "block";
    }
  } catch (error) {
    console.error("Error submitting comment:", error);
    statusMessage.style.color = "red";
    statusMessage.textContent = "An error occurred. Please try again later.";
    statusMessage.style.display = "block";
  }
});
