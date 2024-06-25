import "@/assets/styles/pages/auth/register/register.css";
import Image from "next/image";

import logo from "@/assets/midea/logo-icon/logo-jabakule-307x83.png";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

const Page = () => {
  return (
    <section className="register-main-section">
      <div className="container">
        <div className="logo-center mb-3">
          <Image src={logo} alt={"Logo center element"} />
        </div>

        <div className="register-center mb-3">
          <span className="register-center-text">jabakule - register</span>
        </div>

        <div className="register-form-container">
          <form action="" className="register-main-form">
            <div className="form-controller">
              <div className="mb-5">
                <div className="title-section">Informacoes pessoais</div>
                <div className="form-controller-dual">
                  <div className="form-input-component mb-1">
                    <div>
                      <label htmlFor="email">E-mail</label>
                    </div>
                    <div>
                      <input type="text" name="email" id="email" placeholder="Digite seu e-mail" />
                    </div>
                  </div>
                  <div className="form-input-component mb-1">
                    <div>
                      <label htmlFor="email">E-mail</label>
                    </div>
                    <div>
                      <input type="text" name="email" id="email" placeholder="Digite seu e-mail" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-5">
                <div className="title-section">Seguranca e autenticacao</div>

                <div className="form-controller-dual">
                  <div className="form-input-component mb-3">
                    <div>
                      <label htmlFor="password">Password</label>
                    </div>
                    <div>
                      <input type="text" name="password" id="password" placeholder="Digite sua password" />
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
                </div>
              </div>

              <div className="form-input-component mb-1">
                <button className="submit-button" type={"submit"}>Register</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section >
  )
}

export default Page;