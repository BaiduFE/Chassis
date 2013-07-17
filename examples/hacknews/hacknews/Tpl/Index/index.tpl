<!doctype html>
<html>
<head>
    <title>hacknews</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="apple-mobile-web-app-status-bar-style" content="white" />
	<link rel="stylesheet" type="text/css" href="/static/css/site.css" />
	<!--<link rel="stylesheet" type="text/css" href="/static/css/sitedev.css" />-->

</head>
<body>


    <div class="wrapper">
		
		<div class="headers">
			{if $hasLogin}
			welcome,{$userName}
			{else}
			<a href="{$loginUrl}">login</a>
			{/if}
		</div>
        <div class="ui-box">
            <h5 class="title" id="globalview-top">Hack News <a id="home" href="javascript:;">News</a> | <a id="submit" href="javascript:;">submit</a></h5>
			<div id="list"></div>
			<div id="info"><div id="info-content"></div></div>
			<div id="submitElement"></div>
        </div>
		<div class="global-loading">应用载入中，请稍候...</div>
		<div class="page-loading">数据载入中，请稍候...</div>
		
    </div>
	
	<script type="text/template" id="listtpl">
		<ul class="well-list" id="list">
		<% for(var i = 0, j = list.length; i < j; i++){ %>
			<li>
				<div><%= (page-1)*10 + (i+1) %> <%= list[ i ][ 'title' ] %> [<a target="_blank" href="<%= list[ i ][ 'url' ] %>">Go</a>]</div>
				<div><%= list[ i ][ 'readnum' ] %> points by <%= list[ i ][ 'author' ] %> | <a class="info" href="javascript:;" data-id="<%= list[ i ][ 'id' ] %>">discuss</a></div>
			</li>
		<% } %>
		</ul>
		<div class="more">More...</div>
	</script>
	
	<script type="text/template" id="listtplitem">
		<% for(var i = 0, j = list.length; i < j; i++){ %>
			<li>
				<div><%= (page-1)*10 + (i+1) %> <%= list[ i ][ 'title' ] %> [<a target="_blank" href="<%= list[ i ][ 'url' ] %>">Go</a>]</div>
				<div><%= list[ i ][ 'readnum' ] %> points by <%= list[ i ][ 'author' ] %> | <a class="info" href="javascript:;" data-id="<%= list[ i ][ 'id' ] %>">discuss</a></div>
			</li>
		<% } %>
	</script>
	
	<script type="text/template" id="submitTpl">
		<form>
			<div>
				<label>Title : </label><input type="text" name="title" />
			</div>
			<div>
				<label>URL : </label><input type="text" name="url" />
			</div>
			<div>
				<label></label><input class="submit" type="button" value="submit" />
			</div>
		</form>
	</script>
	
	<script type="text/template" id="commentTpl">
		<div class="articleinfo">
			<h3><%= info[ 'title' ] %> [<a target="_blank" href="<%= info[ 'url' ] %>">Go</a>]</h3>
		</div>
		<ul class="articlecomment">
			<% if(comments && comments.length){ %>
				<% for(var i = 0, j = comments.length; i < j; i++){ %>
				<li>
					<%= comments[ i ][ 'content' ] %>
				</li>
				<% } %>
			<% } %>
		</ul>
		<form>
			<div>
				<label>评论：</label><textarea name="content" class="content"></textarea>
			</div>
			<div>
				<label></label><input class="submit" type="button" value="submit" />
			</div>
		</form>
	</script>
	
	<script type="text/template" id="submitSuccessTpl">
		<h3>提交成功!</h3>
		<ul>
			<li class="goBack">返回首页</li>
			<li class="resetSubmit">继续提交</li>
		</ul>
	</script>
	
	<script type="text/template" id="loginTip">
		<h3>你还没有登录!</h3>
		<ul>
			<li><a href="{$loginUrl}">点此使用新浪微博登录</a></li>
		</ul>
	</script>
	
	<script>
		var Config = {
			'name' : '{$userName}',
			'login' : '{$loginUrl}',
			'haslogin' : {if $hasLogin} true {else} false {/if}
		};
	</script>
	<script type="text/javascript" src="http://zeptojs.com/zepto.min.js"></script>
	<script type="text/javascript" src="/static/js/baidutemplate.js"></script>
	<script type="text/javascript" src="/static/js/chassis.js"></script>
	<script type="text/javascript" src="/static/js/app.js"></script>
	
</body>
</html>