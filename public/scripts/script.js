$(document).on("click", function () {
    var actId = $(this).data('id');
    $(".modal-body #activityLogEditId").val(actId);
});