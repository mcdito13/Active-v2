function setDropdown(activities_list) {

    var listA = [];

    var listB = [];

    for (var i = 0; i < activities_list.length(); i++) {
        if (activities_list[i].type == 'cardio') {
            listA += activities_list[i];
        } else if (activities_list[i].type == 'Weights') {
            listB += activities_list[i];
        }
    }

    $(document).ready(function () {
        $("input[name='chk']").on('change', function () {

            if ($(this).is(':checked') && $(this).val() == '1') {
                $('#describe').empty()
                $.each(listA, function (index, value) {
                    $('#describe').append('<option value="' + value.id + '">' + value.name + '</option>');
                });
            }
            else if ($(this).is(':checked') && $(this).val() == '2') {
                $('#describe').empty()
                $.each(listB, function (index, value) {
                    $('#describe').append('<option value="' + value.id + '">' + value.name + '</option>');
                });
            }
            else {

            }

        });
    });

}