<?php


class IndexAction extends Action {


	public function index(){
		$this->displayPage();
	}
	
	public function info(){
		$this->displayPage();
	}
	
	public function submit(){
		$this->displayPage();
	}
	
	
	public function recordlist(){
		$page = $_GET['page'] ? (int)$_GET['page'] : 1;
		
        $libs = M('news');
        import('ORG.Util.Page');
		
        $perPage = 10;
		$count = $libs->count();
		$totalPage = ceil($libs->count() / $perPage);
        $curPage = $page;
        $result = $libs->limit($perPage)->page($curPage)->order('id desc')->select();
		
		echo json_encode( array(
			'list'      => $result,
			'totalPage' => $totalPage
		) );
	}
	
	public function recordinfo(){
		$id = $_GET['id'] ? (int)$_GET['id'] : 0;
		
        $news = M('news');
        $newsInfo = $news->where('id='.$id)->find(); 
		
		$comment = M('comments');
        $commentInfo = $comment->where('pid='.$id)->select(); 
		
		echo json_encode( array(
			"info"     => $newsInfo,
			"comments" => $commentInfo
		) );
	}
	
	public function addrecord(){
		
		if( $this->userHasLogin() == false ){
			echo json_encode( array(
				"success" => false,
				"data" => array(
					"code" => 0,
					"url" => $this->getLoginUrl()
				)
			) );
			
			return;
		}
		
		$title = $_POST["title"];
		$url   = $_POST["url"];
        $news = M("news");
		$data['title'] = $title;
		$data['url'] = $url;
		$data['readnum'] = 0;
		$data['author'] = $this->getUserName();
		$data['content'] = '';
		$news->add($data);
		echo json_encode( array(
			"success" => true
		) );
		
	}
	
	public function addrecordcomment(){
		$id      = $_POST["id"];
		$content = $_POST["content"];
		
        $comment = M("comments");
		
		$data['pid'] = $id;
		$data['content'] = $content;
		
		$comment->add($data);
		
		echo json_encode( array(
			"success" => true
		) );
		
	}
	
	private function getUserName(){
		$c = new SaeTClientV2( WB_AKEY , WB_SKEY , $_SESSION['token']['access_token'] );
		$ms  = $c->home_timeline();
		$uid_get = $c->get_uid();
		$uid = $uid_get['uid'];
		$user_message = $c->show_user_by_id( $uid );
		return $user_message['screen_name'];
	}
	
	private function userHasLogin(){
		return strlen($this->getUserName()) != 0;
	}
	
	private function getLoginUrl(){
		$o = new SaeTOAuthV2( WB_AKEY , WB_SKEY );
		$code_url = $o->getAuthorizeURL( WB_CALLBACK_URL );
		
		return $code_url;
	}
	
	private function displayPage(){
		$this->assign('loginUrl',$this->getLoginUrl());
		$this->assign('userName',$this->getUserName());
		$this->assign('hasLogin',$this->userHasLogin());
		$this->display('index');
	}
}
