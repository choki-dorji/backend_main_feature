$(document).ready(function () {
  $(".delete").click(function () {
    // add a click event listener to all delete buttons
    var blockId = $(this).attr("data-id"); // get the block id from the data-id attribute
    if (confirm("Are you sure you want to delete this block?")) {
      // show a confirmation dialog box
      $.ajax({
        url: `/api/blocks/${blockId}`, // send a DELETE request to the server
        type: "DELETE",
        success: function () {
          // handle the successful response
          alert("Block deleted successfully");
          location.reload(); // reload the page to reflect the updated data
        },
        error: function () {
          // handle the error response
          alert("Failed to delete block");
        },
      });
    }
 } );
});
