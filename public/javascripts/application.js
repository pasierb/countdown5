window.Countdown5 = {};

$(document).ready(function(){
    Countdown5.countdownContainer = $(".countdown-container > .countdown");
    Countdown5.settingsForm = $("form.countdown-settings");
    Countdown5.editableElements = ["title", "description", "countdown"];
    Countdown5.countdownLayout = '<span class="image{d100}"></span><span class="image{d10}"></span><span class="image{d1}"></span>' + 
        '<span class="imageSep imageSepDay"><p>d</p></span>' + 
        '<span class="image{h10}"></span><span class="image{h1}"></span>' + 
        '<span class="imageSep"><p>:</p></span>' + 
        '<span class="image{m10}"></span><span class="image{m1}"></span>' + 
        '<span class="imageSep"><p>:</p></span>' + 
        '<span class="image{s10}"></span><span class="image{s1}"></span>';


    Countdown5.countdownContainer.countdown({
        until: new Date(Countdown5.countdownContainer.attr("data-until")),
        compact: true, 
        layout: Countdown5.countdownLayout
    });

    $("input.datetimepicker").datetimepicker({
        showButtonPanel: true,
        onSelect: function (dateText, inst) { Countdown5.countdownContainer.countdown('option', 'until', new Date(dateText)); }
    });

    $("input.datetimepicker-inplace").datetimepicker({
        showButtonPanel: true,
        onSelect: function (dateText, inst) { 
            $("input.datetimepicker").val(dateText);
            Countdown5.countdownContainer.countdown('option', 'until', new Date(dateText)); 
        }
    });
  
    $('#settingsTab a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });

    Countdown5.settingsForm.bind("submit", function () {
        var that = $(this);

        if (!$("input[name='until']").val()) {
            alert('Please set countdown date');
            return false;
        }

        $("input[name='title']", that).val(CKEDITOR.instances['title-editable'].getData());
        $("input[name='description']", that).val(CKEDITOR.instances['description-editable'].getData());

        $.ajax({
            url: that.attr("action"),
            type: "POST",
            data: that.serialize(),
            success: function (data, textStatus, jqXHR) {
                var link = "http://"+location.host+"/show/"+data.countdown.slug,
                    linkElements;

                if (!that.hasClass("created")) {
                    linkElements = $(".countdown-link");
                    that.attr('action', '/update/'+data.countdown.slug);
                    linkElements.html(link);
                    linkElements.attr('href',link);
                    $("input[name='slug']").val(data.countdown.slug);
                    $(".x-share").removeClass("hidden");
                    $("#shareModal").modal("show");
                } else {

                }
                that.addClass("created");
            },
            error: function (data, textStatus, jqXHR) {
                
            }
        });
        return false;
    });

    $("a.x-save").click(function () { 
        Countdown5.settingsForm.trigger("submit"); 
        return false;
    });

    $("a.x-until").click(function () {
        $(".datetimepicker-inplace").datetimepicker("show");
        return false;
    });

    $("a.x-background").click(function () {
        $("#settingsModal").modal("show");
        $("input[name='background_image']", Countdown5.settingsForm).focus();
        return false;
    });

    $("input[name='background_image']", Countdown5.settingsForm).keyup(function () {
        var that = $(this);
        $("body").css("background-image", "url('"+that.val()+"')");
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
});