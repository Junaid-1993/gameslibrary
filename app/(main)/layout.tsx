import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { ModalProvider } from "@/app/components/modals/ModalProvider";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <ModalProvider />
      <Footer />
    </>
  );
}
