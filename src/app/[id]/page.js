// 사용자 프로필 페이지

import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import Profile from "@/components/profile/Profile";
import styles from "@/app/page.module.css";
import { metadataMaker } from "@/utils/metadata";

export async function generateMetadata({ params }) {
  return metadataMaker(`${params.id}: DREAMER`, "당신의 꿈을 들려주세요!");
}

export default function UserProfile(props) {
  return (
    <div className={styles.container}>
      <Header />
      <Profile userName={props.params.id} />
      <Footer />
    </div>
  );
}
