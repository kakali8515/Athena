<template>
    <div class="info_protection">
         <div class="breadcrumb">
           <p><a href="#">Home</a> <span>></span>Terms of service</p>
       </div>
       <div class="heading flex justify-between align-end">
           <h4>개인정보 수집 및 이용동의</h4>
       </div>
       <div class="info_main_wrap p-t-40 m-t-30">
           <div class="terms-main-wrap">
                <div class="info">
                    <p> (주)이지시큐(이하 "회사"라 합니다)는 이용자들의 개인정보보호를 매우 중요시하며, 이에 회사는 개인정보보 호법 등 국내의 개인정보 보호 법령에 따라 이용자의 개인정보 및 권익을 보호하고 개인정보 관련한 이용자 의 고충을 원활하게 처리할 수 있도록 철저히 준수합니다.</p>
                </div>
                <div class="description">
                    <h4>1. 수집목적</h4>
                    <p>회사는 수집한 개인정보를 다음의 목적을 위해 처리합니다</p>
                    <ul>
                        <li>1) 홈페이지 관리</li>
                        <li>2) 재화 또는 서비스 제공</li>
                        <li>3) 민원인의 신원확인, 민원사항 확인, 사실조사를 위한 연락•통지, 처리결과 통보, 분쟁 조정을 위한 기록 보존 등</li>
                    </ul>
                </div>
                <div class="description">
                    <h4>2. 수집항목</h4>
                    <ul>
                        <li>1) 회원가입</li>
                        <li><b>필수항목 : 이름, 핸드폰번호, 이메일 주소</b></li>
                    </ul>
                </div>
                <div class="description">
                    <h4>3. 보유기간</h4>
                    <p>이용자의 개인정보는 원칙적으로 개인정보 수집 및 이용목적이 달성(계약 만료 시)되면 지체 없이 파기 합니다.</p>
                    <ul>
                        <li><b>회원 정보 : 회원가입일로부터 “회원 탈퇴 후 최대2년 까지”</b></li>
                        <li><b>취득자 정보 : 자격취득일로부터 “준영구”</b></li>
                    </ul>
                    <p>단, 전자상거래법 등에서의 소비자보호에 관한 법률 등 관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 일정한 기간 동안 회원정보를 보관합니다.</p>
                    <p>이 경우 회사는 보관하는 정보를 그 보관의 목적으로만 이용하며 보존기간의 다음과 같습니다.</p>
                    <ul>
                        <li><b>- ( 전자상거래법 ) 계약 또는 청약철회 등에 관한 기록 : 5년</b></li>
                        <li><b>- ( 전자상거래법 ) 대금결제 및 재화 등의 공급에 관한 기록 : 5년</b></li>
                        <li><b>- ( 전자상거래법 ) 소비자의 불만 또는 분쟁처리에 관한 기록 : 3년</b></li>
                        <li><b>- ( 통신비밀보호법 ) 로그인 기록(로그기록, 접속지의 추적자료) : 3개월</b></li>
                    </ul>
                </div>
                <div class="terms-link">
                    <p>더 자세한 내용에 대해서는 <a href="">개인정보처리방침</a>을 참고하시기 바랍니다.</p>
                </div>
                <div class="alert-info">
                    <p>※ 위의 개인정보 수집‧이용에 대한 동의를 거부할 권리가 있습니다. 그러나 동의를 거부할 경우 서비스 이용 불가 합니다.</p>
                </div>
                <div class="button">
                    <button  @click="$router.go(-1)" type="button" class="bordered">뒤로가기</button>
                </div>
           </div>
       </div>
    </div>
</template>


<script>
export default {
  name: 'terms',
  
}
</script>

<style lang="scss">
    .p-t-40{
        padding-top:40px !important;
    }
    .m-t-30{
        margin-top:30px !important;
    }
</style>