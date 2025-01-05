const form = document.getElementById("comment-form"); // 取得表單
const statusMessage = document.getElementById("status-message"); // 取得顯示狀態的元素



// 偵測表單提交事件
form.addEventListener("submit", async (event) => {
  event.preventDefault(); // 防止表單提交時刷新頁面


  // 獲取輸入框的值
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();


  // 驗證是否有空值
  if (!name || !email || !message) {
    alert("All fields are required!"); // 如果有空值，跳出提示
    return;
  }


  try {
    // 發送 POST 請求到伺服器
    const response = await fetch("/api/comments", {
      method: "POST", // 請求類型是 POST
      headers: { "Content-Type": "application/json" }, // 資料格式是 JSON
      body: JSON.stringify({ name, email, message }), // 傳送的資料
      
    });


    const result = await response.json(); // 取得伺服器回應


    if (response.ok) {
      // 成功：顯示成功訊息
      statusMessage.style.color = "green";
      statusMessage.textContent = result.message;
      statusMessage.style.display = "block";


      // 清空表單
      form.reset();

    } else {
      // 失敗：顯示錯誤訊息
      statusMessage.style.color = "red";
      statusMessage.textContent = result.error || "Failed to submit comment.";
      statusMessage.style.display = "block";

    }
  } catch (error) {
    // 發生錯誤：顯示錯誤訊息
    console.error("Error submitting comment:", error);
    statusMessage.style.color = "red";
    statusMessage.textContent = "An error occurred. Please try again later.";
    statusMessage.style.display = "block";


  }
});
