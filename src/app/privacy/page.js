import Header from "@/components/header/Header";
import basicStyles from "../page.module.css";
import styles from "./page.module.css";
import Footer from "@/components/footer/Footer";
import { CustomScrollbar } from "@/components/Controls";

export default function Privacy() {
  return (
    <div id="container" className={basicStyles.container}>
      <Header />
      <main className={styles["main"]}>
        <h2>DREAMER 개인정보 처리방침</h2>
        <p>
          DREAMER는 「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를
          보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기
          위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.
        </p>
        <h3>1. 개인정보의 처리 목적</h3>
        <p>
          DREAMER는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는
          개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며 이용 목적이
          변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는
          등 필요한 조치를 이행할 예정입니다.
        </p>
        <ol>
          <li>
            <p>회원 가입 및 관리</p>
            <ul>
              <li>
                회원 가입의사 확인, 회원제 서비스 제공, 회원자격 유지·관리,
                서비스 부정이용 방지의 목적으로 개인정보를 처리합니다.
              </li>
            </ul>
          </li>
          <li>
            <p>
              서비스 이용 과정에서 아래와 같은 정보들이 자동으로 생성되어 수집될
              수 있습니다.
            </p>
            <ul>
              <li>IP 주소, 쿠키, 접속 로그, 서비스 이용 기록</li>
            </ul>
          </li>
        </ol>
        <h3>2. 개인정보의 처리 및 보유 기간</h3>
        <ol>
          <li>
            <p>
              DREAMER는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터
              개인정보를 수집 시에 동의 받은 개인정보 보유·이용기간 내에서
              개인정보를 처리·보유합니다.
            </p>
          </li>
          <li>
            <p>각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.</p>
            <ul>
              <li>
                회원 가입 정보: 회원 탈퇴 시까지
                <ul>
                  <li>
                    다만, 다음의 사유에 해당하는 경우에는 해당 사유 종료 시까지
                    <ol>
                      <li>
                        관계 법령 위반에 따른 수사·조사 등이 진행 중인 경우에는
                        해당 수사·조사 종료 시까지
                      </li>
                      <li>
                        서비스 이용에 따른 채권·채무관계 잔존 시에는 해당
                        채권·채무관계 정산 시까지
                      </li>
                    </ol>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ol>
        <h3>3. 처리하는 개인정보의 항목</h3>
        <p>DREAMER는 다음의 개인정보 항목을 처리하고 있습니다.</p>
        <ol>
          <li>
            회원가입 시 수집하는 필수 항목
            <ul>
              <li>아이디</li>
              <li>비밀번호</li>
              <li>이름</li>
              <li>이메일 주소</li>
              <li>생년월일</li>
            </ul>
          </li>
          <li>
            회원 가입 시 수집하는 선택 항목
            <ul>
              <li>프로필 사진</li>
              <li>자기소개</li>
            </ul>
          </li>
        </ol>
        <h3>4. 개인정보의 국외 이전</h3>
        <p>
          DREAMER는 원활한 서비스 제공을 위해 다음과 같이 개인정보를 국외로
          이전하고 있습니다.
        </p>
        <ol>
          <li>
            <p>이전되는 개인정보 항목</p>
            <ul>
              <li>회원가입 시 수집하는 필수 및 선택 항목</li>
            </ul>
          </li>
          <li>
            <p>개인정보가 이전되는 국가</p>
            <ul>
              <li>미국</li>
            </ul>
          </li>
          <li>
            <p>이전일시 및 방법</p>
            <ul>
              <li>회원가입 또는 회원정보 수정 시점에 네트워크를 통한 전송</li>
            </ul>
          </li>
          <li>
            <p>이전받는 자</p>
            <ul>
              <li>업체명: Google LLC</li>
              <li>서비스: Firebase</li>
            </ul>
          </li>
          <li>
            <p>이전받는 자의 이용목적</p>
            <ul>
              <li>회원 데이터베이스 저장 및 관리</li>
            </ul>
          </li>
          <li>
            <p>이전받는 자의 보유·이용기간</p>
            <ul>
              <li>회원 탈퇴 시까지</li>
            </ul>
          </li>
        </ol>
        <h3>5. 개인정보의 파기 절차 및 방법</h3>
        <ol>
          <li>
            <p>
              DREAMER는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가
              불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.
            </p>
          </li>
          <li>
            <p>
              정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이
              달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속
              보존하여야 하는 경우에는, 해당 개인정보를 별도의
              데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.
            </p>
          </li>
          <li>
            <p>개인정보 파기의 절차 및 방법은 다음과 같습니다.</p>
            <ol>
              <li>
                파기절차
                <ul>
                  <li>
                    DREAMER는 파기 사유가 발생한 개인정보를 선정하고, DREAMER의
                    개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.
                  </li>
                </ul>
              </li>
              <li>
                파기방법
                <ul>
                  <li>
                    전자적 파일 형태로 기록·저장된 개인정보는 기록을 재생할 수
                    없도록 파기하며, 종이 문서에 기록·저장된 개인정보는 분쇄기로
                    분쇄하거나 소각하여 파기합니다.
                  </li>
                </ul>
              </li>
            </ol>
          </li>
        </ol>
        <h3>6. 개인정보의 안전성 확보조치</h3>
        <p>
          DREAMER는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고
          있습니다.
        </p>
        <ol>
          <li>
            <p>관리적 조치</p>
            <ul>
              <li>내부관리계획 수립·시행</li>
              <li>정기적 직원 교육</li>
            </ul>
          </li>
          <li>
            <p>기술적 조치</p>
            <ul>
              <li>개인정보처리시스템 등의 접근권한 관리</li>
              <li>접근통제시스템 설치</li>
              <li>고유식별정보 등의 암호화</li>
              <li>보안프로그램 설치 및 갱신</li>
            </ul>
          </li>
          <li>
            <p>물리적 조치</p>
            <ul>
              <li>전산실, 자료보관실 등의 접근통제</li>
            </ul>
          </li>
        </ol>
        <h3>7. 정보주체와 법정대리인의 권리·의무 및 행사방법</h3>
        <ol>
          <li>
            <p>
              정보주체는 DREAMER에 대해 언제든지 개인정보
              열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.
            </p>
            <ul>
              <li>
                14세 미만 아동의 경우 법정대리인이 아동의 개인정보에 대한 권리를
                행사할 수 있습니다.
              </li>
            </ul>
          </li>
          <li>
            <p>
              권리 행사는 DREAMER에 대해 「개인정보 보호법」 시행령 제41조
              제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수
              있으며, DREAMER는 이에 대해 지체없이 조치하겠습니다.
            </p>
          </li>
          <li>
            <p>
              권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을
              통하여 하실 수도 있습니다. 이 경우 "개인정보 처리 방법에 관한
              고시" 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.
            </p>
          </li>
        </ol>
        <h3>8. 개인정보 보호책임자</h3>
        <ol>
          <li>
            DREAMER는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보
            처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와
            같이 개인정보 보호책임자를 지정하고 있습니다.
          </li>
        </ol>
        <ul>
          <li>
            개인정보 보호책임자
            <ul>
              <li>성명: 김지훈</li>
              <li>직책: 기술팀장</li>
              <li>연락처: kim@jihun.io</li>
            </ul>
          </li>
        </ul>
        <ol start="2">
          <li>
            정보주체는 DREAMER의 서비스를 이용하시면서 발생한 모든 개인정보 보호
            관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보
            보호책임자에게 문의하실 수 있습니다.
          </li>
        </ol>
        <h3>9. 권익침해 구제방법</h3>
        <p>
          정보주체는 개인정보침해로 인한 구제를 받기 위하여 다음 기관에
          분쟁해결이나 상담 등을 신청할 수 있습니다.
        </p>
        <ol>
          <li>
            개인정보 분쟁조정위원회: 1833-6972 (
            <a href="http://www.kopico.go.kr">www.kopico.go.kr</a>)
          </li>
          <li>
            개인정보침해신고센터: 118 (
            <a href="privacy.kisa.or.kr">privacy.kisa.or.kr</a>)
          </li>
          <li>
            대검찰청: 1301 (<a href="http://www.spo.go.kr">www.spo.go.kr</a>)
          </li>
          <li>
            경찰청: 182 (<a href="ecrm.cyber.go.kr">ecrm.cyber.go.kr</a>)
          </li>
        </ol>
        <h3>10. 개인정보 처리방침 변경</h3>
        <ol>
          <li>이 개인정보 처리방침은 2024년 12월 16일부터 적용됩니다.</li>
        </ol>
      </main>
      <Footer />
      <CustomScrollbar />
    </div>
  );
}
