<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="ImrDropDownTreeView._Default" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

<!-- Latest compiled and minified CSS -->

    <h3>RTL:</h3><div class="dropdown dropdown-tree" id="firstDropDownTree4"></div>
    

<script>


var arr6=[
{title:"مصر الجديدة",href:"#1",dataAttrs:[{title:"dataattr1",data:"value1"},{title:"dataattr2",data:"value2"},{title:"dataattr3",data:"value3"}]}
,
{title:"مدينة نصر",href:"#2",dataAttrs:[{title:"dataattr4",data:"value4"},{title:"dataattr5",data:"value5"},{title:"dataattr6",data:"value6"}]}
,
{title:"العباسية",href:"#3",dataAttrs:[{title:"dataattr7",data:"value7"},{title:"dataattr8",data:"value8"},{title:"dataattr9",data:"value9"}]}
];

var arr5=[
{title:"القاهرة",href:"#1",dataAttrs:[{title:"dataattr1",data:"value1"},{title:"dataattr2",data:"value2"},{title:"dataattr3",data:"value3"}], data: arr6}
,
{title:"الجيزة",href:"#2",dataAttrs:[{title:"dataattr4",data:"value4"},{title:"dataattr5",data:"value5"},{title:"dataattr6",data:"value6"}]}
,
{title:"الأسكندرية",href:"#3",dataAttrs:[{title:"dataattr7",data:"value7"},{title:"dataattr8",data:"value8"},{title:"dataattr9",data:"value9"}]}
];

var options4 = {
	title : "select",
	data: arr5,
	maxHeight: 300,
	closedArrow: '<i class="fa fa-caret-right" aria-hidden="true"></i>',
	openedArrow: '<i class="fa fa-caret-down" aria-hidden="true"></i>',
	selectChildren: true,
	multiSelect: true,
    rtl: true,
    expandHandler: function(element, expanded){
		
	},
	clickHandler: function(element){
		//gets clicked element parents
		console.log($(element).GetParents());
		//element is the clicked element
		console.log(element);
		$("#firstDropDownTree4").SetTitle($(element).find("a").first().text());
		console.log("Selected Elements",$("#firstDropDownTree4").GetSelected());
	},
}

$("#firstDropDownTree4").DropDownTree(options4);


</script>



</asp:Content>
