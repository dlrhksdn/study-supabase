supabase에서 기억하면 좋을것들

1. supabase에서 authentication에서 url redirect가 있어야 신뢰한다고 믿고
로그인을 시켜줌

2. table에 column을 추가할때 user_id를 만들경우
*1. type : uuid / value : auth.uid()
*2. 링크를 눌러서 schema를 auth로 바꾸고 reference를 users로 바꾸고
user_id -> id로 바꾸고 맨밑에 삭제되었을때를 cascade로 바꾸면\
 계정이 사라지면 그 계정이 작성한 모든것이 같이 사라지도록 함

3. authentication에서 policy로 들어가면 정책을 설정할 수 있음
*. 우선 내가 원하는 정책을 미리 생각해둬야함
(모두가 읽을 수 있게 하는가? : 0)
(글을 지울 수 있는가? : 소유자만)
...등등
