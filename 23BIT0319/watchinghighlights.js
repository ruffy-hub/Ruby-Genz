document.addEventListener("DOMContentLoaded", function() {
    const yearButtons = document.querySelectorAll(".year-btn");
    const videoContainer = document.querySelector(".video-container");
  
    // YouTube links for different years (Replace these with actual YouTube URLs)
    const videoLinks = {
      2024: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with 2024 highlight video URL
      2023: "https://www.youtube.com/embed/kJQP7kiw5Fk", // Replace with 2023 highlight video URL
      2022: "https://www.youtube.com/embed/sQb3EDKLRmghttps://youtu.be/7Qp0XHHiU-0", // Replace with 2022 highlight video URL
      2021: "https://youtu.be/vMXd5FwOKxs", // Replace with 2021 highlight video URL
    };
  
    // Add click event listeners for all year buttons
    yearButtons.forEach(button => {
      button.addEventListener("click", function() {
        const year = this.getAttribute("data-year");
        const videoURL = videoLinks[year];
  
        // Create iframe and load the video
        const iframe = document.createElement("iframe");
        iframe.setAttribute("src", videoURL);
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("allow", "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture");
        iframe.setAttribute("allowfullscreen", "true");
  
        // Clear previous video and append the new one
        videoContainer.innerHTML = ""; // Clear previous iframe
        videoContainer.appendChild(iframe); // Add the new iframe
      });
    });
  });
  