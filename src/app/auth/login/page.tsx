import logo from "@/assets/midea/logo-icon/logo-jabakule-307x83.png";
import "@/assets/styles/pages/auth/login/login.css";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  return (
    <section className="login-main-section">
      <div className="container">
        <div className="login-middle-section">
          <div className="login-logo-center mb-3">
            <Link href={"/"}>
              <Image src={logo} alt={"Logotipo Jabakule"} />
            </Link>
          </div>
          <div className="login-center mb-3">
            <span className="login-center-text">jabakule - login</span>
          </div>
          <form action="" className="login-main-form">
            <div className="form-controller">
              <div className="form-input-component mb-1">
                <div>
                  <label htmlFor="email">E-mail</label>
                </div>
                <div>
                  <input type="text" name="email" id="email" placeholder="Digite seu e-mail" />
                </div>
              </div>
              <div className="form-input-component mb-3">
                <div>
                  <label htmlFor="password">Password</label>
                </div>
                <div>
                  <input type="text" name="password" id="password" placeholder="Digite sua password" />
                </div>
              </div>
              <div className="login-check-points mb-3">
                <span><Checkbox /> Me lembre</span>
                <span><Link href={""} className="link-forgot-password">Esqueceu a senha?</Link></span>
              </div>
              <div className="form-input-component mb-1">
                <button className="submit-button" type={"submit"}>Login</button>
              </div>
            </div>
          </form>

          <div className="login-auth-options">

          </div>
        </div>
      </div>
    </section>
  )
}

export default Page;