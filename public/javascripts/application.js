window.Countdown5 = {};

$(document).ready(function(){
    Countdown5.countdownContainer = $(".countdown-container");
    Countdown5.settingsForm = $("form.countdown-settings");
    Countdown5.editableElements = ["title", "description", "countdown"];
    Countdown5.countdownLayout = '<span class="image{d100}"></span><span class="image{d10}"></span><span class="image{d1}"></span>' + 
        '<span class="imageSep"></span>' + 
        '<span class="image{h10}"></span><span class="image{h1}"></span>' + 
        '<span class="imageSep"></span>' + 
        '<span class="image{m10}"></span><span class="image{m1}"></span>' + 
        '<span class="imageSep"></span>' + 
        '<span class="image{s10}"></span><span class="image{s1}"></span>';

    if (Countdown5.countdownContainer.hasClass("editable")) {
        Countdown5.countdownLayout += "<i class='icon-move'></i>";
    }

    Countdown5.countdownContainer.countdown({
        until: new Date(Countdown5.countdownContainer.attr("data-until")),
        compact: true, 
        layout: Countdown5.countdownLayout
    });

    $("input.datetimepicker").datetimepicker({
        showButtonPanel: true,
        onSelect: function (dateText, inst) { Countdown5.countdownContainer.countdown('option', 'until', new Date(dateText)); }
    });
  
    $('#myTab a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });

    $("input[name='background_image']", Countdown5.settingsForm).keyup(function () {
        var that = $(this);
        $("body").css("background-image", "url('"+that.val()+"')");
    });

    $("input[name='title']", Countdown5.settingsForm).keyup(function () {
        var that = $(this),
            titleContainer = $(".title-container");

        titleContainer.removeClass("placeholder");
        $("h1", titleContainer).html(that.val());
    });

    $("textarea[name='description']", Countdown5.settingsForm).keyup(function () {
        var that = $(this),
            descriptionContainer = $(".description-container");

        descriptionContainer.removeClass("placeholder");
        $("p", descriptionContainer).html(that.val());
    });

    $.each(Countdown5.editableElements, function (index, selector) {
        var saveStyle = function (event, ui) { $("input[name='custom_css["+selector+"]']").val($(this).attr("style")); };
        $("."+selector+"-container.editable").draggable({ 
            stop: saveStyle,
            handle: "i.icon-move"
        }).resizable({ 
            stop: saveStyle 
        });
    });

    $(".title-container h1, .description-container p").click(function () {
        var that = $(this),
            parent = that.parent(),
            inplaceInput = $(".inplace-input", parent);
        
        inplaceInput.val($("[name='"+inplaceInput.attr('name').split("-")[0]+"']", Countdown5.settingsForm).val());
        parent.addClass('inplace');
        inplaceInput.focus();
    });

    $(".inplace-input").blur(function () {
        $(this).parent().removeClass("inplace");
    }).keyup(function () {
        var that = $(this),
            name = that.attr('name').split("-")[0],
            settingsInput = $("[name='"+name+"']", Countdown5.settingsForm);

        settingsInput.val(that.val());
        settingsInput.trigger("keyup");
    });
});