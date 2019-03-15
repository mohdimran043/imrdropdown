<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Home.aspx.cs" Inherits="ImrDropDownTreeView.Home" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="Plugins/bootstrap/jquery-1.9.1.min.js"></script>
    <link href="Plugins/bootstrap/bootstrap.min.css" rel="stylesheet" />
    <script src="Plugins/bootstrap/bootstrap.min.js"></script>
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-T8Gy5hrqNKT+hzMclPo118YTQO6cYprQmhrYwIiQ/3axmI1hQomh7Ud2hPOy8SP1" crossorigin="anonymous">


    <script src="Plugins/DropDownTree/dropdowntree.js"></script>
    <link href="Plugins/DropDownTree/dropdowntree.css" rel="stylesheet" />
    <script>
        $(document).ready(function () {

            var arr6 = [
                { title: "Indian", href: "#", dataAttrs: [{ title: "value", data: "35" }, { title: "class", data: "child" }] }
                ,
                { title: "Egypt", href: "#", dataAttrs: [{ title: "value", data: "36" }, { title: "class", data: "child" }] }
                ,
                { title: "Bangaldesh", href: "#", dataAttrs: [{ title: "value", data: "39" }, { title: "class", data: "child" }] }
            ];

            var arr5 = [
                { title: "Qatari", href: "#", dataAttrs: [{ title: "value", data: "1" }] },
                { title: "NonQatari", href: "#", dataAttrs: [{ title: "value", data: "others" }], data: arr6 }
            ];

            var options4 = {
                title: "None",
                data: arr5,
                selectedValues:'1,35',
                maxHeight: 1300,
                closedArrow: '<i class="fa fa-caret-right" aria-hidden="true"></i>',
                openedArrow: '<i class="fa fa-caret-down" aria-hidden="true"></i>',
                selectChildren: true,
                multiSelect: true,
                rtl: true,
                checkHandler: function (element, e, checked) {

                },
                clickHandler: function (element) {
                    $(element).closest('li').find(".select-box").first().trigger('click');
                },
            }

            $("#firstDropDownTree4").DropDownTree(options4);

        });
    </script>
</head>
<body>
    <form id="form1" runat="server">
        <div align="center">
            <table>
                <tr>
                    <td>
                        <h3>RTL:</h3>
                        <div class="dropdown dropdown-tree" id="firstDropDownTree4"></div>
                    </td>
                </tr>
            </table>

        </div>
    </form>
</body>
</html>
