
var dropDownOptions = {
    title: "Dropdown",
    data: [],
    closedArrow: '<i class="fa fa-caret-right" aria-hidden="true"></i>',
    openedArrow: '<i class="fa fa-caret-down" aria-hidden="true"></i>',
    maxHeight: 300,
    multiSelect: false,
    selectChildren: false,
    addChildren: false,
    clickHandler: function (target) { },
    expandHandler: function (target, expanded) { },
    checkHandler: function (target, checked) { },
    rtl: false,
};

var globalTreeIdCounter = 0;

(function ($) {

    //data inits from options
    $.fn.DropDownTree = function (options) {
        //helpers
        function RenderData(data, element) {
            for (var i = 0; i < data.length; i++) {
                globalTreeIdCounter++;
                var dataAttrs = "";
                if (typeof data[i].dataAttrs != "undefined" && data[i].dataAttrs != null) {
                    for (var d = 0; d < data[i].dataAttrs.length; d++) {
                        dataAttrs += " data-" + data[i].dataAttrs[d].title + "='" + data[i].dataAttrs[d].data + "' ";
                    }
                }
                if (!element.is("li")) {
                    element.append('<li id="TreeElement' + globalTreeIdCounter + '"' + dataAttrs + '>' + (options.multiSelect ? '<i class="fa fa-square-o select-box" aria-hidden="true"></i>' : '') + '<a href="' + ((typeof data[i].href != "undefined" && data[i].href != null) ? data[i].href : '#') + '">' + data[i].title + '</a></li>');
                    if (data[i].data !== null && typeof data[i].data !== "undefined") {
                        $("#TreeElement" + globalTreeIdCounter).append("<ul style='display:none'></ul>");
                        $("#TreeElement" + globalTreeIdCounter).find("a").first().prepend('<span class="arrow">' + options.closedArrow + '</span>');
                        RenderData(data[i].data, $("#TreeElement" + globalTreeIdCounter).find("ul").first());
                    } else if (options.addChildren) {
                        $("#TreeElement" + globalTreeIdCounter).find("a").first().prepend('<span class="arrow">' + options.closedArrow + '</span>');
                    }
                }
                else {
                    element.find("ul").append('<li id="TreeElement' + globalTreeIdCounter + '"' + dataAttrs + '>' + (options.multiSelect ? '<i class="fa fa-square-o select-box" aria-hidden="true"></i>' : '') + '<a href="' + ((typeof data[i].href != "undefined" && data[i].href != null) ? data[i].href : '#') + '">' + data[i].title + '</a></li>');
                    if (data[i].data != null && typeof data[i].data != "undefined") {
                        $("#TreeElement" + globalTreeIdCounter).append("<ul style='display:none'></ul>");
                        $("#TreeElement" + globalTreeIdCounter).find("a").first().prepend('<span class="arrow">' + options.closedArrow + '</span>');
                        RenderData(data[i].data, $("#TreeElement" + globalTreeIdCounter).find("ul").first());
                    } else if (options.addChildren) {
                        $("#TreeElement" + globalTreeIdCounter).find("a").first().prepend('<span class="arrow">' + options.closedArrow + '</span>');
                    }
                }
            }
        }

        options = $.extend({}, dropDownOptions, options, { element: this });


        //protos inits
        $(options.element).init.prototype.clickedElement = null;

        var tree = $(options.element);

        //handlers binders
        //element click handler
        $(options.element).on("click", "li", function (e) {
            tree.init.prototype.clickedElement = $(this);
            options.clickHandler(tree.clickedElement, e);
            e.stopPropagation();
        });

        $(options.element).on("click", ".fa-times", function (e) {
            var title = $(this).closest('div').find('.title').text();
            var isLastElement = false, that;
            $(this).closest('button').parent().find('.dropdown-menu').find('.fa-check-square-o').each(function (idx, item) {                
                if ($(item).closest('li').first().find('a').first().text() === title) {
                    $(item).removeClass("fa-check-square-o");
                    $(item).addClass("fa-square-o");
                }
            });
            
            if ($(this).closest('button').find('.title').length === 1) {
                isLastElement = true;
                that = $(this).closest('button');
            }
            $(this).closest('div').remove();

            if (isLastElement) {
                $(that).html('<span class="dropdowntree-name">' + options.title + '</span>');
            }

            e.stopImmediatePropagation();
        });

        //arrow click handler close/open
        $(options.element).on("click", ".arrow", function (e) {
            e.stopPropagation();
            $(this).empty();
            var expanded;
            if ($(this).parents("li").first().find("ul").first().is(":visible")) {
                expanded = false;
                $(this).prepend(options.closedArrow);
                $(this).parents("li").first().find("ul").first().hide();
            } else {
                expanded = true;
                $(this).prepend(options.openedArrow);
                $(this).parents("li").first().find("ul").first().show();
            }
            options.expandHandler($(this).parents("li").first(), e, expanded);
        });

        //select box click handler
        $(options.element).on("click", ".select-box", function (e) {
            e.stopPropagation();
            var checked;
            if ($(this).hasClass("fa-square-o")) {
                //will select
                checked = true;
                $(this).removeClass("fa-square-o");
                $(this).addClass("fa-check-square-o");
                if (options.selectChildren) {
                    if ($(this).closest('li').attr('data-class') === 'child') {
                        if ($(this).closest("ul").find('li').length === $(this).closest("ul").find('.fa-check-square-o').length) {
                            $(this).closest("ul").find('li').each(function (idx, childElement) {
                                $(options.element).RemoveTitle($(childElement).closest('li').find(".select-box"));
                                $(childElement).find(".select-box").removeClass("fa-check-square-o");
                                $(childElement).find(".select-box").addClass("fa-square-o");
                                //alert($(childElement).closest('li').find("a").text());
                                
                            });
                            $(this).closest("ul").parent().closest('li').find(".select-box").first().removeClass("fa-square-o");
                            $(this).closest("ul").parent().closest('li').find(".select-box").first().addClass("fa-check-square-o");
                        }
                        else {

                            $(this).closest("ul").parent().closest('li').find(".select-box").first().addClass("fa-square-o");
                            $(this).closest("ul").parent().closest('li').find(".select-box").first().removeClass("fa-check-square-o");
                            $(options.element).RemoveTitle($(this).closest("ul").closest("li").first().find(".select-box"));
                        }
                    }

                }
            } else {
                //will unselect
                checked = false;
                $(this).addClass("fa-square-o");
                $(this).removeClass("fa-check-square-o");
                if (options.selectChildren) {
                    $(this).parents("li").first().find(".select-box").addClass("fa-square-o");
                    $(this).parents("li").first().find(".select-box").removeClass("fa-check-square-o");
                    $(this).parents("li").each(function () {
                        $(this).find(".select-box").first().removeClass("fa-check-square-o");
                        $(this).find(".select-box").first().addClass("fa-square-o");
                        options.checkHandler($(this), e, checked);
                    });
                }
            }
            $(".fa-check-square-o").each(function (index, item) {
               // alert($(item).closest('li').find("a").first().text());
                $(options.element).SetTitle($(item).closest('li').find("a").first().text());
            });
            if (!checked) {
                $(options.element).RemoveTitle($(this));
            }
            options.checkHandler($(this).parents("li").first(), e, checked);
        });

        if (options.rtl) {
            $(options.element).addClass("rtl-dropdown-tree");
            if (options.closedArrow.indexOf("fa-caret-right") > -1) {
                options.closedArrow = options.closedArrow.replace("fa-caret-right", "fa-caret-left");
            }
        }
        $(options.element).append('<button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"><span class="dropdowntree-name">' + options.title + '</span><span class="caret"></span></button>');
        $(options.element).append('<ul style="max-height: ' + options.maxHeight + 'px" class="dropdown-menu" aria-labelledby="dropdownMenu1"></ul>');

        RenderData(options.data, $(options.element).find("ul").first());



        //protos inits
        $(options.element).init.prototype.GetParents = function () {
            var jqueryClickedElement = $(options.element).clickedElement;
            return $(jqueryClickedElement).parents("li");
        };
        $(options.element).init.prototype.RemoveTitle = function (element) {
            var isLastElement = false, that;
            $(element).closest('li').find('a').each(function (oidx, outerItem) {
                $(element).closest('.dropdown-tree').find('.title').each(function (idx, item) {
                    if ($(item).text() === $(outerItem).text()) {
                        if ($(this).closest('button').find('.title').length === 1) {
                            isLastElement = true;
                            that = $(this).closest('button');
                        }
                        $(this).closest('div').remove();
                        if (isLastElement) {
                            $(that).html('<span class="dropdowntree-name">' + options.title + '</span>');
                        }
                    }

                });
            });

        };
        $(options.element).init.prototype.SetTitle = function (title) {
            // $(this).find(".dropdowntree-name").text(title);
            var schema = '<div class="title-item" data-value="111"><span class="fa fa-times"></span><span class="title">' + title + '</span></div>';
            if ($(this).find(".dropdowntree-name").text() == options.title) {
                $(this).find(".dropdowntree-name").html('');

            }
            var alreadyExist = false;
            $(this).find(".dropdowntree-name").find('.title').each(function (idx, item) {
                if ($(item).text() == title) {
                    alreadyExist = true;
                }
            });
            if (!alreadyExist) {
                $(this).find(".dropdowntree-name").prepend(schema);
            }

        };

        $(options.element).init.prototype.GetSelected = function (title) {
            var selectedElements = [];
            $(this).find(".fa-check-square-o").each(function () {
                selectedElements.push($(this).parents("li").first());
            });
            return selectedElements;
        };

        $(options.element).init.prototype.AddChildren = function (element, arrOfElements) {
            if (options.addChildren && $(element).find("ul").length == 0)
                $(element).append("<ul></ul>");
            element = $(element).find("ul").first();
            if (element.find("li").length == 0)
                RenderData(arrOfElements, element);
        };

    };
})(jQuery);